const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('user.db');
var cors = require('cors');

app.use(cors())

//   http://localhost:3333/users
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    (err, rows) => {
      console.log(rows);
        res.send(rows);
      }
  });
});


//   http://localhost:3333/users/iris
app.get('/getid/:id', (req, res) => {
  const id = req.params.id;
  const fname = req.params.fname;

  db.all(
    'SELECT * FROM users WHERE id=$userid ',
    {
      $userid: id
    },
    (err, rows) => {
      console.log(rows);
      if (rows.length > 0) {
        res.send(rows[0]);
      } else {
        res.send({});
       }
    }
  );
});

app.get('/getfirstname/:fname', (req, res) => {
  const fname = req.params.fname;

  db.all(
    'SELECT * FROM users WHERE first_name=$fname ',
    {
      $fname: fname
    },
    (err, rows) => {
      console.log(rows);
      if (rows.length > 0) {
        res.send(rows[0]);
      } else {
        res.send({});
       }
    }
  );
});

app.get('/getlastname/:lname', (req, res) => {
  const lname = req.params.lname;

  db.all(
    'SELECT * FROM users WHERE last_name=$lname ',
    {
      $lname: lname
    },
    (err, rows) => {
      console.log(rows);
      if (rows.length > 0) {
        res.send(rows[0]);
      } else {
        res.send({});
       }
    }
  );
});

app.get('/getemail/:email', (req, res) => {
  const email = req.params.email;

  db.all(
    'SELECT * FROM users WHERE $email=email ',
    {
      $email: email
    },
    (err, rows) => {
      console.log(rows);
      if (rows.length > 0) {
        res.send(rows[0]);
      } else {
        res.send({});
       }
    }
  );
});

app.get('/getgender/:gender', (req, res) => {
  const gender = req.params.gender;

  db.all(
    'SELECT * FROM users WHERE $gender=gender ',
    {
      $gender: gender
    },
    (err, rows) => {
      console.log(rows);
        res.send(rows);

    }
  );
});

app.get('/getage/:lowage/:highage', (req, res) => {
  const lowage = req.params.lowage;
  const highage = req.params.highage;

  db.all(
    'SELECT * FROM users WHERE age BETWEEN $lowage AND $highage ',
    {
      $highage: highage,
      $lowage: lowage
    },
    (err, rows) => {
      console.log(rows);
        res.send(rows);

    }
  );
});

app.listen(3333, () => {
  console.log('Server started at http://localhost:3333/');
});
