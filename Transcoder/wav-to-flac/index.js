/**
* Created by Chris Mendez
* Last Updated: 02/22/2018
*/

'use strict';
var AWS = require('aws-sdk');

var elasticTranscoder = new AWS.ElasticTranscoder({
	region: process.env.ELASTIC_TRANSCODER_REGION
});

exports.handler = function(event, context, callback){
	console.log('Hello');
	console.log('event: ' + JSON.stringify(event));

	var key = event.Records[0].s3.object.key;

	// If the file has spaces, replace them with +
	var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));

	// Remove any extensions
	var outputKey = sourceKey.split('.')[0];

	var params = {
		PipelineId: process.env.ELASTIC_TRANSCODER_PIPELINE_ID,
		OutputKeyPrefix: outputKey + '/',
		Input: {
			Key: sourceKey
		},
		Outputs: [
			{
				Key: outputKey + '-48k' + '.mp4',
				PresetId: '1519356733417-70ti8w' //Custom HE-AAC 48k
			},
			{
				Key: outputKey + '-128k' + '.mp4',
				PresetId: '1351620000001-100130' //Preset AAC 128k
			},
			{
				Key: outputKey + '-128k' + '.mp3',
				PresetId: '1351620000001-300040' //Preset Mp3 128k
			}
	]};

	elasticTranscoder.createJob(params, function(error, data){
		if (error){
			callback(error);
		}
		console.log('elasticTranscoder callback data: ' + JSON.stringify(data));
	});
};

