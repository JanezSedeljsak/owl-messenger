const express = require('express');
const router = express.Router();
const settings = require("./connect");
const QueryBuilder = require('node-querybuilder');

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
                .where({'g.id': id})
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }
    static getGroups() {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');
    
            qb.select([
                'c.id as id',
                'CONCAT(t.name, " ", t.surname) AS teacher',
                'c.name as competition',
                'c.deadline',
                'c.date_created',
                'c.places',
                'c.description'
            ]).from('competitions c')
                .join('teachers t', 't.id=c.teacher_id', 'left')
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
                'c.id as id',
                'CONCAT(t.name, " ", t.surname) AS teacher',
                'c.name as competition',
                'c.deadline',
                'c.date_created',
                'c.places',
                'c.description'
            ]).from('competitions c')
                .join('teachers t', 't.id=c.teacher_id', 'left')
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }
    static getPeople() {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');
    
            qb.select([
                'c.id as id',
                'CONCAT(t.name, " ", t.surname) AS teacher',
                'c.name as competition',
                'c.deadline',
                'c.date_created',
                'c.places',
                'c.description'
            ]).from('competitions c')
                .join('teachers t', 't.id=c.teacher_id', 'left')
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

router.get('/get-people', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getPeople()
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