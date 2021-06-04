module.exports.verifyCredentials = (db, user)=>{
    return new Promise((res, rej) => {
        let psw = Buffer.from(user.userPassword, 'base64').toString();
        sha1 = require('js-sha1')
        let password = sha1(psw)
        db.executeQuery("SELECT UserName, UserRole FROM dbo.[User] WHERE UserName='"+user.userName+"' AND UserPassword='"+password+"'")
        .then(function(response){
            if(response[0]==undefined){
                res(false)
            } else{
                res(response[0].UserName+"-_-"+response[0].UserRole)
            }
        })
        .catch(function(err){
            rej(err);
        }); 
    });
}