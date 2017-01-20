'use strict';
const Router = require('express').Router;
const request = require('request');
const jwt = require('jwt-simple');
const qs = require('querystring');
const userRouter = new Router();
const User = require('./models/user');

/**
 * Save new user to db and give them a signed jwt token
 */
function signJwt(user) {
    let userData = {
        userId: user._id
    };
    return jwt.encode(userData, 'our_little_sekret');
}
userRouter.post('/signup', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, userExists) => {
        if (userExists) {

            //for toastr popups
            return res.status(409).send({
                message: "that email has already been used"
            });
        }
        let user = new User({
            displayName: req.body.displayName,
            email: req.body.email,
            password: req.body.password
        }).save((err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message
                });
            }
            res.send({
                token: signJwt(data)
            });
        });
    });
});

/**
 * Regular login for a user register with methods above
 * Using the +password param to tell mongo to include in query
 */

userRouter.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }, '+password', (err, user) => {
        if (!user) {
            return res.status(401).send({
                message: 'sorry, we could not match that user name or password'
            });
        }

        /**
         *use the checkPassword method defined in models/user.js
         */
        user.checkPassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(401).send({
                    message: 'sorry, invalid email/password'
                });
            }
            res.send({
                token: signJwt(user)
            });
        });
    });
});
userRouter.post('/twitter', (req, res) => {

    let reqTokenUrl = process.env.REQ_TOKEN_URL;
    let accTokenUrl = process.env.ACC_TOKEN_URL;
    let profileUrl = process.env.PROF_URL;
    let CON_KEY = process.env.CONSUMER_KEY;
    let CON_SEC = process.env.CONSUMER_SECRET;

    if (!req.body.oauth_token || req.body.oauth_verifier) {
        let oauthReqToken = {
            consumer_key: CON_KEY,
            consumer_secret: CON_SEC,
            callback: req.body.redirectUri
        };
        request.post({
                url: reqTokenUrl,
                oauth: oauthReqToken
            },
            (err, response, body) => {
                let oauthToken = qs.parse(body);
                console.log(oauthToken);
                res.send(oauthToken);
            });
    } else {
        let accToken = {
            consumer_key: CON_KEY,
            consumer_secret: CON_SEC,
            token: req.body.oauth_token,
            verifier: req.body.oauth_verifier
        };
        request.post({
            url: accTokenUrl,
            oauth: accToken
        }, (err, res, accessToken) => {
            accessToken = qs.parse(accessToken);
            let profileOauth = {
                consumer_key: CON_KEY,
                consumer_secret: CON_SEC,
                oauth_token: accessToken.oauth_token
            };
            request.get({
                url: `${profileUrl}${accToken.screen_name}`,
                oauth: profileOauth,
                json: true
            }, (err, res, profile) => {
                if (req.header('Authorization')) {
                    User.findOne({
                        twitter: profile.id
                    }, (err, userExists) => {
                        let token = req.header('Authorization').split(' ')[1];
                        let data = jwt.decode(token, CON_SEC);

                        User.findById(data.userId, (err, user) => {
                            if (!user) {
                                return res.status(400).send({
                                    message: 'sorry, not found'
                                })
                            }
                            user.twitter = profile.id;
                            user.displayName = user.displayName || profile.name;
                            user.save(err => {
                                res.send({
                                    token: signJwt(user)
                                });
                            });
                        });
                    });
                } else {
                    User.findOne({
                        twitter: profile.id
                    }, (err, userExists) => {
                        if (userExists) {
                            return res.send({
                                token: signJwt(userExists)
                            })
                        }
                        let user = new User();
                        user.twitter = profile.id;
                        user.displayName = profile.name;
                        user.save(() => {
                            res.send({
                                token: signJwt(user)
                            })
                        })
                    })
                }
            });
        });
    }
});
module.exports = userRouter;
