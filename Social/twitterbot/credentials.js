/*
For now, I've chosen to place the credentials in .env. 
You can use this instead if you'd like. 
*/
require('dotenv').config({path: ''})

module.exports = {
  "consumer_key":        process.env.CONSUMER_KEY,
  "consumer_secret":     process.env.CONSUMER_SECRET,
  "access_token_key":    process.env.ACCESS_TOKEN_KEY,
  "access_token_secret": process.env.ACCESS_TOKEN_SECRET
};