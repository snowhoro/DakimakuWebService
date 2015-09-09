var mongoose = require('mongoose')
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Account = require('../models/Account_model');


function authenticate(data,callback){
   Account.findOne({_id : data.id}, function(err,result){
      if(err){
        callback(true, { errorMsg: err});
      }else{
        if(!result){  // Vacio
          callback(true, { errorMsg: 'User Not Found'});
        }else{
          callback(null, result);
        }
      }
    });
}

exports.handleAuth = function(req,res){ // Handlers..
      authenticate({ id: '55ee36928994fd88235fe0b9'}, function(error, result){
        if(error)
          return res.send(error);  // Return del error que me envia el modulo
        else{
          res.send(result.token);
        }
      });
}



/*module.exports = function(app){



  function authenticate(req,res){
    Account.findOne({ _id: '55ee36928994fd88235fe0b9'},function(err,user){

      if(err) throw err;

      if(!user){
        res.send({ msg:'este usuario no existe ameo'});
      }else{
        // if user is found and password is right
          // create a token
          var token = jwt.sign(user, app.locals.secret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
      }
    });
  };
}*/