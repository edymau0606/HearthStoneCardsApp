var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //if(req.session.loggedin) {
    //var userInfo = (req.session.username)
        res.render('createDeck', {
            //userName: userInfo
            userName: "edymau_0606@hotmail.com"
        })
  //} else {
      //res.redirect("login")
  //}
});

module.exports = router;