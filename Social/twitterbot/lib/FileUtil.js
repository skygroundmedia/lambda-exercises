////////////////////////////////////////////////////////////
// Name: FileUtil
// Modified: 5/6/12
// Desc: Take care of reading, writing, importing, text files
////////////////////////////////////////////////////////////

//var x/y/z will not be accessible from outside this module
var fs      = require("fs");
var path = require("path");
var stream = null;

exports.init = function( filePath ){
  this.deleteFile( filePath );
}

exports.checkPathExists = function( filePath ){
  path.join( process.cwd(), filePath );
  path.exists( filePath, function( exists ) {
    console.log( "checkPathExists: " + exists + " : " + filePath );
    if( exists ) return true;
    else return false;
  });  
}

exports.deleteFile = function( filePath ){
  if( this.checkPathExists( filePath ) ){
    //Delete any previous JSON file
    fs.unlink( filePath, function(err){
      if(err) throw err;
      console.log( "fsError: " + err )
    });    
  }
  this.createStreamingFile( filePath );  
}

//http://docs.nodejitsu.com/articles/file-system/how-to-write-files-in-nodejs
exports.createFile = function( filePath, data ){
	stream = fs.writeFile( filePath, data, function (err) {
		if( err ) return console.log( err );
	});
}

exports.createStreamingFile = function( filePath ){
	stream = fs.createWriteStream( filePath );
}

exports.readFile = function( filePath ){
    var d = fs.readFileSync( filePath, "utf-8" );
    //console.log( d );
    return d;
}

//You are grabbing the data in chunks so it's not one data dump
exports.appendData = function( chunk ){
  stream.write( chunk );  
}

/**********************************
Getters / Setters
**********************************/
exports.getFs = function(){
  return fs;
}
exports.getStream = function(){
  return stream;
}