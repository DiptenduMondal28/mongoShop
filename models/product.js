const mongodb=require('mongodb');
const getdb = require('../util/database').getdb

class Product{
  constructor(title,price,imageUrl,description,id){
    this.title=title;
    this.price=price;
    this.imageUrl=imageUrl;
    this.description=description;
    this._id=new mongodb.ObjectId(id);
  }

  save(){
    const db = getdb();
    let dbOp;
    if(this._id){
      //update the product 
      dbOp=db.collection('products').updateOne({_id:this._id},{$set:this})
    }else{
      //save the product 
      dbOp=db.collection('products').insertOne(this)
    }
    return dbOp.then(result =>{
      console.log(result)
    }).catch(error =>{
      console.log(error)
    });
  }

  static fetchAll(){
    const db = getdb()
    return db.collection('products')
      .find()
      .toArray()
      .then(products=>{
      console.log(products)
      return products
    }).catch(err=>{
      console.log(err);
    })
  }

  static findById(prodId){
    const db = getdb();
    return db.collection('products').find({_id:new mongodb.ObjectId(prodId)}).next().then(product =>{
      console.log(product);
      return product;
    }).catch(err=>{
      console.log(err);
    })
  }

  static deletebyid(prodId){
    const db = getdb();
    return db
    .collection('products')
    .deleteOne({_id:new mongodb.ObjectId(prodId)})
    .then(result=>{
      console.log('succesfully deleted !')
    })
    .catch(err=>{
      console.log(err)
    })
  }

}


module.exports = Product;
