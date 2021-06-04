module.exports.create = (db, user)=>{
    return new Promise((res, rej) => {
        let psw = Buffer.from(user.userPassword, 'base64').toString()
        sha1 = require('js-sha1')
        let password = sha1(psw)
        db.executeQuery("INSERT INTO dbo.[User] VALUES('"+user.userName+"', '"+password+"', (SELECT RoleID FROM dbo.[Role] WHERE RoleName = '"+user.userRole+"'))")
        .then(function(response){
            res(response);
        })
        .catch(function(err){
            rej(err);
        });
    });
}

module.exports.delete = (db, userName)=>{
    return new Promise((res, rej) => {
        db.executeQuery("DELETE FROM dbo.[User] WHERE UserName = '"+userName+"'")
        .then(function(response){
            res(response);
        })
        .catch(function(err){
            rej(err);
        });
    });
}

module.exports.update = (db, name, user)=>{
    return new Promise((res, rej) => {
        if(user.userPassword==""){
            db.executeQuery("UPDATE dbo.[User] SET UserName ='"+user.userName+"', UserRole = (SELECT RoleID FROM dbo.[Role] WHERE RoleName = '"+user.userRole+"') WHERE UserName = '"+name+"'")
            .then(function(response){
                res(response);
            })
            .catch(function(err){
                rej(err);
            });
        } else {
            let psw = Buffer.from(user.userPassword, 'base64').toString()
            sha1 = require('js-sha1')
            let password = sha1(psw)
            db.executeQuery("UPDATE dbo.[User] SET UserName ='"+user.userName+"', UserPassword ='"+password+"', UserRole = (SELECT RoleID FROM dbo.[Role] WHERE RoleName = '"+user.userRole+"') WHERE UserName = '"+name+"'")
            .then(function(response){
                res(response);
            })
            .catch(function(err){
                rej(err);
            });
        }
    });
}