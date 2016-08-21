var md5 = require('blueimp-md5');
var uuid = require('node-uuid');
var express = require('express');
var router = module.exports = express.Router();
var dep = require('../models/dep');
var user = {
    username: "gavinning",
    password: "c3dc6ca6378dd0991cd0dd5140f9422a"
};
var guid;

// 防止重放攻击
function getEncryption(password, guid) {
    return md5(password + guid)
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res){
    guid = uuid.v4();
    req.session.user ?
        res.redirect('/lincoapp'):
        res.render('login', { title: 'Express', guid: guid });
});

// Login
router.post('/login', function(req, res){
    let password = getEncryption(user.password, guid);
    if(req.body.username === user.username && req.body.password === password){
        req.session.user = user;
        res.send('success');
    }
    else{
        res.status(400).send('fail');
    }
});

router.all('*', function(req, res, next){
    req.session.user ?
        next():
        res.redirect('/login');
});

// Logout
router.post('/logout', function(req, res){
    req.session.user = null;
    res.send('success')
});

// HOME
router.get('/lincoapp', function(req, res, next) {
    dep.getTags().then(tags => {
        res.render('lincoapp', { tags: tags.reverse() })
    })
    .catch(err => {
        res.status(500).send(err.message)
    })
});

router.post('/api/publish', function(req, res, next){
    let isDep = req.body.dep === 'true' ? true : false;
    dep.deploy.publish(isDep).then(tag => {
        res.json({
            code: 0,
            data: {
                tag: {
                    name: tag.name(),
                    message: tag.message()
                }
            }
        })
    })
});

router.post('/api/rollback', function(req, res, next){
    let isDep = req.body.dep === 'true' ? true : false;
    dep.deploy.rollback(req.body.tagName, isDep).then(tag => {
        res.json({
            code: 0,
            data: {
                tag: {
                    name: tag.name(),
                    message: tag.message()
                }
            }
        })
    })
});

router.get
