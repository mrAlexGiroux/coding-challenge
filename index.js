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
 * 
 */
app
  .get('/', (req, res) => res.redirect('/ninjify'))

   /**
    * 
    */
  .get('/ninjify', (req,res) => {
    
    if (req.param('x') != null) {
      let queryBuzzword = req.query.x;
      let buzzwords = queryBuzzword.split(",");
      
      // Tell don't ask
      ninjaNameGenerator.GenerateNinjaName(buzzwords, res);

    }
    else {
      res.render('index');
    }
  })
  /**
   * 
   */
  .post('/ninjify', (req, res) =>{
    console.log(req.body);
    let buzzwords = req.body.buzzword;

    // Tell don't ask
    ninjaNameGenerator.GenerateNinjaName(buzzwords, res);

  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
