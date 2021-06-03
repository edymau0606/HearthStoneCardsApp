var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  /* if (req.session.loggedin) {
    var userInfo = (req.session.username).split("-_-")
    if (parseInt(userInfo[1]) == 1) {
      res.render('createUser', {
        hiddenEl: (process.env.HIDDEN_EL).toString(),
        hiddenActualEl: (process.env.HIDDEN_ACTUAL_EL).toString(),
        userName: userInfo[0]
      })
    }else{
      res.send("Your user does not have access")
    }
  } else {
    res.redirect("login");
  }*/

  res.render('createUser', {
    userName: "edymau_0606@hotmail.com"
  })
}); 

module.exports = router;