const dotenv = require('dotenv')
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const
    azureStorage = require('azure-storage'),
    blobService = azureStorage.createBlobService(),
    containerName = 'decks'


module.exports.create = function(db, deck, text){
    return new Promise((res, rej) => {
        blobService.createBlockBlobFromText(containerName, deck.deckName+ "_" + deck.user +".txt", text, err => {
            if (err) {
                rej(err);
            } else {
                res({ message: `Text "${text}" is written to blob storage` });
                db.executeQuery("INSERT INTO dbo.[Deck] VALUES('"+deck.deckName+"','"+deck.cardFormat+"', '"+deck.cardClass+"', (SELECT UserID FROM dbo.[User] WHERE UserName = '" + deck.user +"'), '"+deck.deckBlobUrl+"')")
                .then(function(response){
                    res(response);
                })
                .catch(function(err){
                    rej(err);
                });
            }
        });
    });
};

module.exports.delete = function(db, name){
    return new Promise((res, rej) => {
        var deckName = (name.split("-_-"))[0];
        var userName = (name.split("-_-"))[1];
        blobService.deleteBlobIfExists(containerName, deckName+"_" + userName +".txt", err => {
            if (err) {
                rej(err);
            } else {
                res({ message: `Block blob '${name}' deleted` });
                db.executeQuery("DELETE FROM dbo.[Deck] WHERE DeckName='"+deckName+"' AND UserID=(SELECT UserID FROM dbo.[User] WHERE UserName = '"+ userName +"')")
                .then(function(response){
                    res(response);
                })
                .catch(function(err){
                    rej(err);
                }); 
            }
        });
    });
};

module.exports.getDeck = function(name){
    return new Promise((res, rej) => {
        var deckName = (name.split("-_-"))[0];
        var userName = (name.split("-_-"))[1];
        blobService.getBlobToText(containerName, deckName+ "_"+ userName +".txt", (err, data) => {
            if (err) {
                rej(name);
            } else {
                json = JSON.parse(data)
                res(json[0]);
            }
        });
    });
};

module.exports.update = function(db, name, text){
    return new Promise((res, rej) => {
        var deckName = (name.split("-_-"))[0];
        var userName = (name.split("-_-"))[1];
        blobService.deleteBlobIfExists(containerName, deckName+"_" + userName +".txt", err => {
            if (err) {
                rej(err);
            } else {
                res({ message: `Block blob '${name}' deleted` });
                blobService.createBlockBlobFromText(containerName, deckName+"_" + userName +".txt", text, err => {
                    if (err) {
                        rej(err);
                    } else {
                        res({ message: `Text "${text}" is written to blob storage` });
                    }
                });
            }
        });
    });
};