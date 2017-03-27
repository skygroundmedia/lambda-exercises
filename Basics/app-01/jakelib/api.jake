/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: api.jake
Date: 3/26/17
Author: Chris Mendez http://chrisjmendez.com
Description: API requests made to an AWS API Gateway.
It is assumed that within your AWS API Gateway, you 
might have a single function written for three stages: 
dev, staging, and prod.

Example: 

//Submit a CURL request to the Productin API
jake api:getAll[prod]

* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var util    = require('util')
var request = require('request')
var apiConfig = {
  development: process.env.API_DEV,
  staging:     process.env.API_STAGING,
  production:  process.env.API_PROD,
  key:         process.env.API_KEY
}

namespace('api', function () {
  desc('GET All Orders. Requires API_KEY. Ex: jake api:getAll[prod]');
  task('getAll', { async: true }, function(env) {
    //A. Get the URL path based on your dev environment: dev, stating, prod
    var url  = getURLPath(env);
    var path = url + "guitars/";
    //B. Use NPM Request to construct a GET request
    request.get({ url: path, json: true }, function(err, res){
      if(err) throw err
        console.log(res.body)
    });
    
  });
	
  desc('GET item detail based on id. Requires API_KEY. Ex: jake api:getItemDetail[dev,0000]');
  task('getItemDetail', { async: true }, function(env, id) {
    //A. Create URL
    var url  = getURLPath(env);
    var path = url + "guitars/" + id;
    
    //A. API_KEY Check
    if(!apiConfig.key) throw Error("Error: API_KEY required within .env.")      
    //B. Use NPM Request to construct a GET request
    request.get({ 
      headers: {'x-api-key' : apiConfig.key },
      url: path, 
      json: true 
    }, function(err, res){
      if(err) throw err
        console.log(res.body);
    });
  });

  desc('POST order');
  task('getOrder', { async: true }, function(env, id) {    
    var id = id
    //A. API_KEY Check
    if(!apiConfig.key) throw Error("Check API_KEY param within .env.");
    //B. Use NPM Request to construct a POST request
    request.post({
      headers: {'x-api-key' : apiConfig.key },
      url:     getURLPath(env) + 'order/',
      body:    JSON.stringify({ orderId: id})
    }, function(err, res, data){
      if(err) throw err;
      if( data ){
        console.log(JSON.parse(data));
      }
    });
  });
});

//Return the URL based on the staging environment
function getURLPath(env){
  var url = "";

  if(!apiConfig) throw Error("Check API_KEY param within .env.");
  
  switch(env){
    case "stag":
    case "staging":
      url = apiConfig.staging
      break;
    case "prod":
    case "production":
      url = apiConfig.production
      break;
    case "dev":
    case "development":
    default:
      url = apiConfig.development
  }
  console.log("Environment:", env, " URL:", url );
  return url
}
