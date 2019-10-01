const express = require("express");
const router = express.Router();
const settings = require("./connect");
const QueryBuilder = require("node-querybuilder");
const CryptoJS = require("crypto-js");
const moment = require("moment");

const hash = pass => passwordHash.generate(pass);

const generateToken = userObj => {
    let token = CryptoJS.AES.encrypt(JSON.stringify(userObj), "t3l3gr4m4PP");
    return token.toString();
};

const parseToken = token => {
    let userObj = JSON.parse(
        CryptoJS.AES.decrypt(token, "t3l3gr4m4PP").toString(CryptoJS.enc.Utf8)
    );
    return userObj;
};

class DBMethods {
    static getChatGroups(token) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");

            qb.select(["g.name", "g.id"])
                .from("groups g")
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }

    static sendMessage(data, token) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");
            const input = {
                content: data.content,
                msg_time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                group_id: data.group,
                user_id: token._id
            };

            qb.returning("id").insert("messages", input, (err, res) => {
                if (err) resolve(err);
                else resolve(res);
            });
        });
    }

    static getPorfile(token) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");

            qb.select([
                "m.id",
                "m.content",
                "u.name",
                "u.surname",
                "m.msg_time",
                "m.user_id"
            ])
                .from("groups g")
                .join("messages m", "m.group_id=g.id", "left")
                .join("users u", "m.user_id=u.id", "left")
                .where({ "g.id": groupId })
                .order_by("m.msg_time")
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }

    static getMessages(token, groupId) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");

            qb.select([
                "m.id",
                "m.content",
                "u.name",
                "u.surname",
                "m.msg_time",
                "m.user_id"
            ])
                .from("groups g")
                .join("messages m", "m.group_id=g.id", "left")
                .join("users u", "m.user_id=u.id", "left")
                .where({ "g.id": groupId })
                .order_by("m.msg_time")
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }

    static getGroupById(id) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");

            qb.select(["g.name"])
                .from("groups g")
                .where({ "g.id": id })
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }
    static getGroups(token) {
        return new Promise(async resolve => {
            let groupsIN = await this.getGroupsYouAreIn(token);

            resolve({
                in: groupsIN,
                not_in: await this.getGroupsYouAreNotIn(token, groupsIN.map(x => x.id))
            })
        });
    }

    static getGroupsYouAreIn(token) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");
        
            qb.select(["g.name", "gu.user_id", "g.id", "g.admin"])
                .from("groupsusers gu")
                .join("groups g", "g.id=gu.group_id", "right")
                .where({"gu.user_id": token._id})
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result ? result : err);
                });
        });
    }

    static getGroupsYouAreNotIn(token, groupsIN) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");
            console.log(groupsIN, "128");
            qb.select(["g.name", "gu.user_id", "g.id", "g.admin"])
                .from("groupsusers gu")
                .join("groups g", "g.id=gu.group_id", "right")
                .where({"g.admin !=": token._id})
                .where_not_in("g.id", groupsIN.length ? groupsIN : ["fixInpt"])
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result ? result : err);
                });
        });
    }

    static joinGroup(token, groupId) {
        return new Promise(async resolve => {
            console.log(groupId);
            const qb = new QueryBuilder(settings, "mysql", "single");
            const input = {
                created_time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                user_id: token._id,
                group_id: groupId,
                type: "member"
            };

            qb.returning("id").insert("groupsusers", input, (err, res) => {
                if (err) resolve(err);
                else resolve(res);
            });
        });
    }


    static leaveGroup(token, groupId) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");

            qb.delete("groupsusers", { group_id: groupId, user_id: token._id }, (err, res) => {
                if (err) resolve(err);
                else resolve(res);
            });
        });
    }

    static deleteChatById(id) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");

            qb.delete("messages", { id: id }, (err, res) => {
                if (err) resolve(err);
                else resolve(res);
            });
        });
    }

    static updateMessage(_id, _content) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");

            const data = {
                content: _content,
            };

            qb.update("messages", data, { id: _id }, (err, res) => {
                resolve(err ? err : res);
            });
        });
    }

    static getProfileData(token) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");

            qb.select(["*"])
                .from("users")
                .where({ "id": token._id })
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }

    static getYourGroups(token) {
        console.log(token._id);
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");

            qb.select(["g.name", "g.id"])
                .from("groups g")
                .where({ "g.admin": token._id })
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }

    static getPeople(token) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, "mysql", "single");

            qb.select(["u.name", "u.surname"])
                .from("users u")
                .where({ "u.id !=": token._id })
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }
}

router.post("/get-groups", async (req, res, next) => {
    let token = await parseToken(req.body.tokenString);
    console.log("tle smo");
    if (token) {
        res.status(200).json({
            ok: true,
            result: {
                groups: await DBMethods.getGroups(token),
                id: token._id
            }
        });
    } else {
        res.status(200).json({
            ok: false,
            result: "naw fam"
        });
    }

});

router.post("/delete-chat", async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.deleteChatById(req.body.id)
    });
});

router.post("/update-chat", async (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        ok: true,
        result: await DBMethods.updateMessage(req.body.data.msgId, req.body.data.content)
    });
});

router.post("/get-people", async (req, res, next) => {
    console.log("people call");
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: await DBMethods.getPeople(token)
    });
});

router.post("/join-group", async (req, res, next) => {
    console.log("people call");
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: await DBMethods.joinGroup(token, req.body.id)
    });
});

router.post("/leave-group", async (req, res, next) => {
    console.log("people call");
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: await DBMethods.leaveGroup(token, req.body.id)
    });
});

router.post("/get-profile-data", async (req, res, next) => {
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: await DBMethods.getProfileData(token)
    });
});

router.post("/get-your-chats", async (req, res, next) => {
    let token = await parseToken(req.body.tokenString);
    console.log(await DBMethods.getYourGroups(token));
    res.status(200).json({
        ok: true,
        result: await DBMethods.getYourGroups(token)
    });
});

router.post("/get-group-by-id", async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getGroupById(req.body.id)
    });
});

router.post("/send-message", async (req, res, next) => {
    console.log("baje smo pršli not", req.body);
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: await DBMethods.sendMessage(req.body.data, token)
    });
});

router.post("/get-messages", async (req, res, next) => {
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: await DBMethods.getMessages(req.body.tokenString, req.body.id)
    });
});

router.post("/get-chat-groups", async (req, res, next) => {
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: {
            groups: await DBMethods.getChatGroups(token),
            id: token._id
        }
    });
});

module.exports = router;
