const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

let _db;
const username = process.env.USERNAME_MONGO;
const password = process.env.PASSWORD;
console.log(username,password)

const mongoConnect = callback => {
  MongoClient.connect(
    `mongodb+srv://${username}:${password}@cluster0.vuytclo.mongodb.net/shop?retryWrites=true&w=majority`
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
