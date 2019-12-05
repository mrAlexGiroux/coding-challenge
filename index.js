const express = require('express')
const path = require('path')
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.use(express.static(path.join(__dirname, '/public')));
app
  .set('views',path.join(__dirname,'public'))
  .set('view engine', 'ejs');

app
  .get('/', (req, res) => res.render('index'))

  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM buzzword');
      const results = { 'results': (result) ? result.rows : null};
      res.render('db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  .post('/ninjify', (req, res) =>{

    if (req.param('x') != null) {
      let queryBuzzword = querystring.stringify(req.query);
      let parseBuzzword = querystring.parse(queryBuzzword, ',');
      let buzzwords = Array.from(parseBuzzword); 
    }
    res.render('ninjify');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
