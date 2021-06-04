var express = require('express');
var connection = require('../controllers/connection')
var router = express.Router();

router.get('/', function(req, res, next) {
    connection.executeQuery("SELECT RoleID, RoleName FROM dbo.[Role]").then(function(response){
    var data = {}
    var roles = [];
    for(let i=0; i<response.length; i++){
      roles.push({id: response[i].RoleID, roleName: response[i].RoleName})
    }
    data = {data: roles}
    res.end(JSON.stringify(data))
  })
  .catch(function(err){
    res.end(err)
  });
});

module.exports = router;