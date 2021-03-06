const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const { generateSignedUrls } = require('../modules/imageHandler');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('getting your collection');
    const queryText = `SELECT "shoe"."id", "user_id", "shoe_name", "style", "story", "image", "date_added", "last_worn", "deadstock", "brand"."brand", "c1"."color" AS "color1", "c2"."color" AS "color2", "image"."media_key" FROM "shoe"
                      JOIN "brand" ON "brand"."id" = "shoe"."brand_id"
                      JOIN "color" AS "c1" ON "c1"."id" = "shoe"."color1_id"
                      JOIN "color" AS "c2" ON "c2"."id" = "shoe"."color2_id" 
                      JOIN "image" ON "image"."id" = "shoe"."image_id" 
                      WHERE "user_id" = 26;`;
	pool.query(queryText)
	    .then((response) => { generateSignedUrls(res, response.rows) }
      )
	    .catch((error) => {res.sendStatus(500); console.log('something went wrong getting collection', error);
	});
});

router.post('/', (req, res) => {
  const newShoe = req.body;
  console.log(newShoe);
  const queryText = `INSERT INTO "shoe" ("user_id", "shoe_name", "brand_id", "style", "color1_id", "color2_id", "story", "date_added", "deadstock", "image_id") 
  VALUES (26, $1, $2, $3, $4, $5, $6, $7, true, $8);`;
  const queryValues = [
    newShoe.shoe_name,
    newShoe.brand_id,
    newShoe.style,
    newShoe.color1_id,
    newShoe.color2_id,
    newShoe.story,
    newShoe.date_added,
    newShoe.imageId
  ];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error adding new shoe', err);
      res.sendStatus(500);
    });
});

router.get('/details/:id', (req, res) => {
    console.log(req.params.id);
    const queryText = `SELECT "shoe"."id", "user_id", "shoe_name", "style", "story", "image", "date_added", "last_worn", "deadstock", "brand"."brand", "c1"."color" AS "color1", "c2"."color" AS "color2", "image"."media_key" FROM "shoe"
                        JOIN "brand" ON "brand"."id" = "shoe"."brand_id"
                        JOIN "color" AS "c1" ON "c1"."id" = "shoe"."color1_id"
                        JOIN "color" AS "c2" ON "c2"."id" = "shoe"."color2_id" 
                        JOIN "image" ON "image"."id" = "shoe"."image_id" 
                        WHERE "shoe"."id" = $1;`;
    pool.query(queryText, [req.params.id])
      .then((response) => { generateSignedUrls(res, response.rows) })
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
