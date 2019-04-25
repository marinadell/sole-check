const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('getting your collection');
    const queryText = `SELECT "shoe"."id", "shoe_name", "user_id", "style", "story", "image", "date_added", "last_worn", "deadstock", 
            "brand"."brand", "c1"."color" AS "color1", "c2"."color" AS "color2" FROM "shoe"
            JOIN "brand" ON "brand"."id" = "shoe"."brand_id"
            JOIN "color" AS "c1" ON "c1"."id" = "shoe"."color1_id"
            JOIN "color" AS "c2" ON "c2"."id" = "shoe"."color2_id" 
            WHERE "user_id" = 26`;
	pool.query(queryText)
	    .then((result) => res.send(result.rows))
	    .catch((error) => {res.sendStatus(500); console.log('something went wrong getting collection', error);
	});
});

router.get('/details/:id', (req, res) => {
    console.log(req.params.id);
    const queryText = `SELECT "shoe"."id", "shoe_name", "user_id", "style", "story", "image", "date_added", "last_worn", "deadstock", 
    "brand"."brand", "c1"."color" AS "color1", "c2"."color" AS "color2" FROM "shoe"
    JOIN "brand" ON "brand"."id" = "shoe"."brand_id"
    JOIN "color" AS "c1" ON "c1"."id" = "shoe"."color1_id"
    JOIN "color" AS "c2" ON "c2"."id" = "shoe"."color2_id" 
    WHERE "shoe"."id" = $1`;
    pool.query(queryText, [req.params.id])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT shoe', err);
        res.sendStatus(500);
      });
  });

  router.put('/details/:id', (req, res) => {
    console.log(req.params.id, req.body.worn_date);
    let wornDate = "'" + req.body.worn_date + "'"
    const queryText = `UPDATE "shoe" SET "deadstock" = FALSE, "last_worn" = $1 WHERE "id" = $2;`;
    pool.query(queryText,[wornDate, req.params.id])
      .then((result) => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing SELECT shoe', err);
        res.sendStatus(500);
      });
  });

  router.delete('/details/:id', (req, res) => {
    console.log(req.params.id);
    
    const queryText = `DELETE FROM "shoe" WHERE "id" = ${req.params.id};`;
    //pool.query(queryText, [req.query.id])
    pool.query(queryText)
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error deleting shoe query', err);
        res.sendStatus(500);
      });
  });

module.exports = router;
