const express = require('express');
const path = require('path');
const ninjaNameGenerator = require('./public/assets/js/ninjaNameGenerator');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded());
app.set('views',path.join(__dirname,'public'));
app.set('view engine', 'ejs');

/**
* Redirect to /ninjify
*/
app.get('/', (req, res) => res.redirect('/ninjify'));

/**
 * Get ninjify
 * Check for a query with the parameter ?x=
 * Splits the request into an array
 * Calls GenerateNinjaName
 */
app.get('/ninjify', (req,res) => {
    
    if (req.param('x') != null) {
      let queryBuzzword = req.query.x;
      let buzzwords = [""];
      buzzwords = queryBuzzword.split(",");

      ninjaNameGenerator.GenerateNinjaName(buzzwords, res);

    }
    else {
      res.render('index');
    }
  });
  /**
   * Retrieve the information from the form buzzword with body.parser
   * Splits on every comma into an array
   * Calls GenerateNinjaName
   */
app.post('/ninjify', (req, res) =>{
    let postBuzzwords = req.body.buzzword;

    let buzzwords = [""];
    buzzwords = postBuzzwords.split(",")

    ninjaNameGenerator.GenerateNinjaName(buzzwords, res);

  });
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
