const express = require('express');
const path = require('path');
const ninjaNameGenerator = require('./public/assets/js/ninjaNameGenerator');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '/public')));
app
  .set('views',path.join(__dirname,'public'))
  .set('view engine', 'ejs');

app
  .get('/', (req, res) => res.render('index'))

  .get('/ninjify', (req,res) =>{
    
    if (req.param('x') != null) {
      let queryBuzzword = querystring.stringify(req.query);
      let parseBuzzword = querystring.parse(queryBuzzword, ',');
      let buzzwords = Array.from(parseBuzzword);
      
      let ninjaName = ninjaNameGenerator(buzzwords);

      res.render('ninjyfy',{ninjaName: ninjaName});
    }
  })
  .post('/ninjify', (req, res) =>{
    res.render('ninjify');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
