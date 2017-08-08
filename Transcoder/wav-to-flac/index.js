/**
 * Created by Peter Sbarski
 * Updated by Mike Chambers
 * Last Updated: 1/02/2017
 *
 * Required Env Vars:
 * ELASTIC_TRANSCODER_REGION
 * ELASTIC_TRANSCODER_PIPELINE_ID
 */

'use strict';
var AWS = require('aws-sdk');

var elasticTranscoder = new AWS.ElasticTranscoder({
    region: process.env.ELASTIC_TRANSCODER_REGION
});

exports.handler = function(event, context, callback){
    console.log('Welcome');
    console.log('event: ' + JSON.stringify(event));

    var key = event.Records[0].s3.object.key;

    //the input file may have spaces so replace them with '+'
    var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));

    //remove the extension
    var outputKey = sourceKey.split('.')[0];

    var params = {
        PipelineId: process.env.ELASTIC_TRANSCODER_PIPELINE_ID,
        OutputKeyPrefix: outputKey + '/',
        Input: {
            Key: sourceKey
        },
        Outputs: [
            {
                Key: outputKey + '.flac',
                PresetId: '1351620000001-000001'
            }
        ]};

    elasticTranscoder.createJob(params, function(error, data){
        if (error){
            callback(error);
        }
        console.log('elasticTranscoder callback data: ' + JSON.stringify(data));
    });
};