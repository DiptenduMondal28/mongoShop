const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://diptendumondal2801:OsQTDPKmxRxVy6Z9@cluster0.vuytclo.mongodb.net/shop?retryWrites=true&w=majority'
  ) 
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getdb = () =>{
  if(_db){
    return _db;
  }
  throw "no data base found"
}

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;
