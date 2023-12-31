const express = require('express');
const cors = require('cors');
const { createConnection } = require('mysql2');

const app = express();
app.use(cors());

const db = createConnection({ //use your own credentials and information
  host: 'localhost',
  user: 'Sean',
  password: 'fairfax30',
  database: 'testdb',
  port: 3306,
});

db.connect((err) => { //verifies connection
  if (err) {
    console.error('Connection failed:', err);
  } else {
    console.log('Connected to database');
  }
});

app.get('/api/champion', (req, res) => {
  const { Type, roles, Resource } = req.query;
  console.log('Received:', Type, roles, Resource);

  const query = //finds champ(s) that has the same type, class, and resource and outputs corresponding name(s)

    `SELECT name FROM testdb.champion_list_complete
    WHERE Type = ? AND FIND_IN_SET(?, roles) AND Resource = ?`;

  console.log('Query:', query, [Type, roles, Resource]); //debugging purposes

  const queryParams = [Type, roles, Resource];

  db.query(query, queryParams, (err, results, fields) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Query results:', results);
      console.log('Fields:', fields);
      res.json(results);
    }
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
