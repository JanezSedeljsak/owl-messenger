const express = require('express');
const CryptoJS = require('crypto-js');
const router = express.Router();
const passwordHash = require('password-hash');
const settings = require("./connect");
const QueryBuilder = require('node-querybuilder');
const axios = require('axios');
const moment = require('moment');


const hash = pass => passwordHash.generate(pass)

const generateToken = userObj => {
    let token = CryptoJS.AES.encrypt(JSON.stringify(userObj), "t3l3gr4m4PP");
    return token.toString();
}

const parseToken = token => {
    let userObj = JSON.parse(CryptoJS.AES.decrypt(token, "t3l3gr4m4PP").toString(CryptoJS.enc.Utf8));
    return userObj;
}

router.post('/create-user', (req, res, next) => {
    const qb = new QueryBuilder(settings, 'mysql', 'single');
    const data = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hash(req.body.pass).toString(),
        date_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    };

    qb.returning('id').insert('users', data, (err, result) => {
        if (err) {
            console.log(err);
            res.status(200).json({
                ok: false,
                result: 'Pojavila se je napaka; Najverjetneje uporabnik že obstaja!'
            });
        }
        else {
            res.status(200).json({
                ok: false,
                result: 'Nov uporabnik je bil dodan!'
            });
        }
    });
});

router.post('/get-user', (req, res, next) => {
    const qb = new QueryBuilder(settings, 'mysql', 'single');

    qb.select("id, password").from('users')
        .where({ email: req.body.email })
        .get(async (error, result) => {
            qb.disconnect();
            if (error) {
                res.status(200).json({
                    ok: false,
                    result: 'Pojavila se je napaka pri iskanju uporabnika!'
                });
            } else {
                if (!result.length) {
                    res.status(200).json({
                        ok: false,
                        result: "Uporabnik ni bil najden!"
                    });
                } else {
                    let pass = result[0].password;
                    var passwordHash = require('password-hash/lib/password-hash');
                    if (passwordHash.verify(req.body.pass, pass)) {
                        res.status(200).json({
                            ok: true,
                            result: await generateToken({
                                _id: result[0].id
                            })
                        });
                    } else {
                        res.status(200).json({
                            ok: false,
                            result: "Pojavila se je neznana napaka!"
                        });
                    }

                }
            }
        });
});

router.post('/route-guard', async (req, res, next) => {
    console.log(req.body.tokenString);
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: { _id: token._id }
    });
});


router.post('/get-username', async (req, res, next) => {
    let token = await parseToken(req.body.tokenString);
    const qb = new QueryBuilder(settings, 'mysql', 'single');
    console.log(token, "129");
    qb.select("name, surname").from('teachers')
        .where('id', token._id)
        .get((err, result) => {
            qb.disconnect();
            res.status(200).json({
                ok: true,
                result: result
            });
        });
});


module.exports = router;