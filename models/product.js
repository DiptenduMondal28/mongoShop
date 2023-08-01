const getdb = require('../util/database').getdb

class Product{
  constructor(title,price,imageUrl,description){
    this.title=title;
    this.price=price;
    this.imageUrl=imageUrl;
    this.description=description;
  }

  save(){
    const db = getdb()
    return db.collection('products').insertOne(this).then(result =>{
      console.log(result)
    }).catch(error =>{
      console.log(error)
    });
  }
}


module.exports = Product;
