class Deck {
    constructor (deckName, cardFormat, cardClass, user, deckBlobUrl){
        this.deckName = deckName;
        this.cardFormat = cardFormat;
        this.cardClass = cardClass;
        this.user = user;
        this.deckBlobUrl = deckBlobUrl;
    }
}

module.exports = Deck;