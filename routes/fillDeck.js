var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.loggedin) {
    var userInfo = (req.session.username).split("-_-")
    if (parseInt(userInfo[1]) == 1) {
      res.render('fillDeck', {
        hiddenEl: (process.env.HIDDEN_EL).toString(),
        userName: userInfo[0],
        xRapidapiKey: (process.env.X_RAPIDAPI_KEY).toString()
      })
    }else{
      res.render("fillDeck",{
        userName: userInfo[0],
        xRapidapiKey: (process.env.X_RAPIDAPI_KEY).toString()
      })
    }
  } else {
    res.redirect("login");
  }
});

module.exports = router;