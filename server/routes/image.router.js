const aws = require('aws-sdk');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
require('dotenv').config();

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey:  process.env.AWS_SECRET_KEY
});


router.get('/', (req, res) => {
    sign (filename, filetype)
        let s3 = new aws.S3();

        let params = {
            Bucket: solecheck,
            Key: filename,
            Expires: 90,
            ContentType: filetype
        };

        console.log(params);

        s3.getSignedUrl(`putObject`, params, function(err, data) {
            if (err) {
                console.log(err);
                return err;
            } else {
                console.log(data);
                return data;
            }
        });
    }
    
);

module.exports = router;