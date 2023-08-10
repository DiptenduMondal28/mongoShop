const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');


const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const user = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64d3bcd9cb5b0945459abfbe')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const username = process.env.USERNAME_MONGO;
const password = process.env.PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.vuytclo.mongodb.net/shop?retryWrites=true&w=majority`).then(result=>{
  User.findOne().then(user=>{
    if(!user){
      const User = new user({
        name:'DIPTENDU',
        email:'diptendumondal.2801@gmail.com',
        cart:{
          items:[]
        }
      })
      User.save();
    }
  })
  console.log('connected!');
  app.listen(3000);
}).catch(err=>{
  console.log(err);
})