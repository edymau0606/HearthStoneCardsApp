var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //if (req.session.loggedin) {
    //var userInfo = (req.session.username).split("-_-")
    //if (parseInt(userInfo[1]) == 1) {
      res.render('fillDeck', {
        //hiddenEl: (process.env.HIDDEN_EL).toString(),
        //hiddenActualEl: (process.env.HIDDEN_ACTUAL_EL).toString(),
        //userName: userInfo[0]
        userName: "edymau_0606@hotmail.com"
      })
    //}else{
      //res.render("dataTable",{
       // userName: userInfo[0]
      //})
    //}
  //} else {
    //res.redirect("login");
  //}
});

module.exports = router;