const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

const multer  = require('multer');
const multerDest = process.env.multer_dest || '../uploads';
const upload = multer({ dest: multerDest });
const { uploadPost, uploadPostWithText, generateSignedUrls } = require('../modules/imageHandler');

router.post('/', upload.single('file'), (req, res) => {
    uploadPost(req, res);
});

router.get('/', (req, res) => {
    const queryText = `SELECT * from image`;
    pool.query(queryText)
        .then(response => { generateSignedUrls(res, response.rows) })
        .catch(error => { res.sendStatus(500); console.log('error getting image', error);
         })
})

module.exports = router;