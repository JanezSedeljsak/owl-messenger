const express = require('express');
const router = express.Router();
const settings = require("./connect");
const QueryBuilder = require('node-querybuilder');
const CryptoJS = require('crypto-js');

const hash = pass => passwordHash.generate(pass)

const generateToken = userObj => {
    let token = CryptoJS.AES.encrypt(JSON.stringify(userObj), "t3l3gr4m4PP");
    return token.toString();
}

const parseToken = token => {
    let userObj = JSON.parse(CryptoJS.AES.decrypt(token, "t3l3gr4m4PP").toString(CryptoJS.enc.Utf8));
    return userObj;
}

class DBMethods {
    static getChatGroups() {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.select([
                'g name'
            ]).from('groups g')
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }
    static getGroupById(id) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.select([
                'g name'
            ]).from('groups g')
                .where({ 'g.id': id })
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }
    static getGroups(id) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.select([
                'g.name'
            ]).from('groups g')
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }

    static getYourGroups() {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.select([
                'g name'
            ])
                .from('groups g')
                .where({ 'g.admin': id })
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });


        });
    }

    static getPeople(token) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.select([
                'u.name',
                'u.surname'
            ]).from('users u')
                .where({ 'u.id !=': token._id })
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }
}

router.get('/get-groups', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getGroups()
    })
});

router.post('/get-people', async (req, res, next) => {
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: await DBMethods.getPeople(token)
    })
});

router.get('/get-your-groups', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getYourGroups()
    });
});

router.post('/get-group-by-id', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getGroupById(req.body.id)
    })
});

router.get('/get-chat-groups', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getChatGroups()
    })
});

module.exports = router;