const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('getting brands');
    const queryText = `SELECT * FROM "color";`;
	pool.query(queryText)
	    .then((result) => res.send(result.rows))
	    .catch((error) => {res.sendStatus(500); console.log('something went wrong getting brands', error);
	});
});

module.exports = router;