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
    static getChatGroups(token) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.select([
                'g.name',
                'g.id'
            ]).from('groups g')
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }

    static getMessages(token, groupId) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.select([
                'm.id',
                'm.content',
                'u.name',
                'u.surname',
                'm.msg_time'
            ]).from('groups g')
                .join('messages m', 'm.group_id=g.id', 'left')
                .join('users u', 'm.user_id=u.id', 'left')
                .where({ 'g.id': groupId })
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

    static deleteChatById(id) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.delete('messages', {'id': id}, (err, res) => {
                qb.release();
                if (err) resolve(err);
                else resolve(res)
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
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: await DBMethods.getGroups(token)
    })
});


router.post('/delete-chat', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.deleteChatById(req.body.id)
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

router.post('/get-messages', async (req, res, next) => {
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: await DBMethods.getMessages(req.body.tokenString, req.body.id)
    })
});

router.post('/get-chat-groups', async (req, res, next) => {
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: await DBMethods.getChatGroups(token)
    })
});

module.exports = router;