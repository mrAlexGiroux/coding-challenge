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
app.get('/', (req, res) => res.redirect('/ninjify'));

   /**
    * 
    */
app.get('/ninjify', (req,res) => {
    
    if (req.param('x') != null) {
      let queryBuzzword = req.query.x;
      let buzzwords = [""];
      buzzwords = queryBuzzword.split(",");
      
      console.log("Get Ninjify: " + buzzwords);

      ninjaNameGenerator.GenerateNinjaName(buzzwords, res);

    }
    else {
      res.render('index');
    }
  });
  /**
   * 
   */
app.post('/ninjify', (req, res) =>{
    let postBuzzwords = req.body.buzzword;

    let buzzwords = [""];
    buzzwords = postBuzzwords.split(",")
    console.log("Post ninjify: " + buzzwords);

    ninjaNameGenerator.GenerateNinjaName(buzzwords, res);

  });
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
