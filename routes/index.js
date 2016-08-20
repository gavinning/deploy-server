var express = require('express');
var router = express.Router();
var dep = require('../models/dep');
var user = {
    username: "gavinning",
    password: "c3dc6ca6378dd0991cd0dd5140f9422a"
};

dep.getTags.then(tags => console.log(tags))

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// HOME
router.get('/lincoapp', function(req, res, next) {
    req.session.user ?
        res.render('lincoapp', { title: 'Express' }):
        res.render('login', { title: 'Express' });
});

// Login
router.post('/login', function(req, res){
    if(req.body.username === user.username && req.body.password === user.password){
        req.session.user = user;
        res.send('success');
    }
    else{
        res.status(400).send('fail');
    }
});

// Logout
router.post('/logout', function(req, res){
    req.session.user = null;
    res.send('success')
});

module.exports = router;
