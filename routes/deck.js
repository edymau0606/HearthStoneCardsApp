var express = require('express');
var router = express.Router();
var db = require('../controllers/connection')
var decks = require('../controllers/deckController')
var Deck = require('../models/deck');

router.get('/', function(req, res, next) {
  if (req.session.loggedin) {
    var userInfo = (req.session.username).split("-_-")
    if (parseInt(userInfo[1]) == 1) {
      res.render('listDecks', {
        hiddenEl: (process.env.HIDDEN_EL).toString(),
        userName: userInfo[0],
        xRapidapiKey: (process.env.X_RAPIDAPI_KEY).toString()
      })
    }else{
      res.render("listDecks",{
        userName: userInfo[0],
        xRapidapiKey: (process.env.X_RAPIDAPI_KEY).toString()
      })
    }
  } else {
    res.redirect("login");
  }
});

router.get('/:name', function(req, res, next) {
  var name = req.params.name;
  decks.getDeck(name)
  .then(function(response){
    res.send(response);
  })
  .catch(function(err){
    res.send("-1_-_"+err);
  })
});

router.post('/', function(req, res, next) {
  var deck = new Deck(req.body.deckName, req.body.cardFormat, req.body.cardClass, req.body.user, req.body.deckBlobUrl);
  var text = req.body.text;
  decks.create(db, deck, text)
  .then(function(response){
    res.send(response);
  })
  .catch(function(err){
    res.send(err);
  })
})

router.delete('/:name', function(req,res,next){
  var name = req.params.name;
  decks.delete(db, name)
  .then(function(response){
    res.send(response);
  })
  .catch(function(err){
    res.send(err);
  })
})

router.put('/:name', function(req, res, next) {
  var name = req.params.name;
  var text = req.body.text;
  decks.update(db, name, text)
  .then(function(response){
    res.send(response);
  })
  .catch(function(err){
    res.send(err);
  })
})

module.exports = router;