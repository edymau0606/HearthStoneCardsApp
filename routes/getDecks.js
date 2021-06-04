var express = require('express');
var connection = require('../controllers/connection')
var router = express.Router();

router.get('/:user', function(req, res, next) {
  var user = req.params.user
    connection.executeQuery("SELECT DeckID, DeckName, CardFormat, CardClass, UserName, deckBlobUrl FROM dbo.[Deck] INNER JOIN dbo.[User] ON dbo.[Deck].UserID = dbo.[User].UserID WHERE UserName='"+ user + "'").then(function(response){
    var data = {}
    var decks = [];
    for(let i=0; i<response.length; i++){
      decks.push({id: response[i].UserID, deckName: response[i].DeckName, cardClass: response[i].CardClass, cardFormat: response[i].CardFormat, user: response[i].UserName, html: "<a href='#' class='click' id='"+response[i].DeckID+"' name='"+response[i].DeckName+"-_-"+response[i].CardFormat+"-_-"+response[i].CardClass+"' onclick='editDeck(this)'><i class='icon-edit icon-2x'></i></a><a href='#' class='click' id='"+response[i].DeckID+"' name='"+response[i].DeckName+"-_-"+response[i].CardFormat+"-_-"+response[i].CardClass+"' onclick='deleteDeck(this)'><i class='icon-remove-circle icon-2x'></i></a>"})
    }
    data = {data: decks}
    res.end(JSON.stringify(data))
  })
  .catch(function(err){
    res.end(err)
  });
});

module.exports = router;