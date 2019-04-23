const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
// router.post('/register', (req, res, next) => { 
//   console.log(req.body);
  
//   const username = req.body.username;
//   const password = encryptLib.encryptPassword(req.body.password);
//   const firstname = req.body.first_name;
//   const lastname = req.body.last_name;
//   const birthday = req.body.birthday;
//   const email = req.body.email;

//   const queryText = 'INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id';
//   const queryText2 = 'INSERT INTO "user_info" (user_id, first_name, last_name, email, birthday) VALUES ($1, $2, $3, $4,)'
//   pool.query(queryText, [username, password])
//     .then((response) => {res.sendStatus(201);
//       const id = response.rows[0].id
//       console.log(id);
//     })
//     .catch((error) => {res.sendStatus(500); console.log('not registering user', error);
//     });
// });

router.post('/register', async(req, res, next) => {
  const client = await pool.connect()

  console.log(req.body);
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstname = req.body.first_name;
  const lastname = req.body.last_name;
  const birthday = req.body.birthday;
  const email = req.body.email;

  const queryText = 'INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id';
  const queryText2 = 'INSERT INTO "user_info" (user_id, first_name, last_name, email, birthday) VALUES ($1, $2, $3, $4, $5)'
   
  try {
    await client.query('BEGIN')
    const result = await client.query(queryText, [username, password]);
    const id = result.rows[0].id
    console.log(id);
    const userInfo = await client.query(queryText2, [id, firstname, lastname, email, birthday])
    await client.query('COMMIT')
  }
  catch (error) {
    await client.query('ROLLBACK')
    console.log('adding user info error', error);
  } finally {
    client.release()
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
