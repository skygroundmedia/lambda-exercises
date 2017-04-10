/*
For now, I've chosen to place the credentials in .env. 
You can use this instead if you'd like. 
*/
require('dotenv').config({path: ''})

module.exports = {
  "consumer_key": process.env.consumer_key,
  "consumer_secret": process.env.consumer_secret,
  "access_key_token": process.env.access_key_token,
  "access_key_secret": process.env.access_key_secret
};