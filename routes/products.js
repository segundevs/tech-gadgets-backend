const router = require('express').Router();
// const User = require('../models/User');
const Product = require('../models/Product');


//Get a product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
})

// Get all products
router.get('/', async (req, res) => {
  const searchPrice = req.query.price;
  const searchName = req.query.name;
  try {
    let products;
    if(searchName){
      products = await Product.find({name: searchName})
    }else if(searchPrice){
      products = await Product.find({price: searchPrice})
    }else{
      products = await Product.find()
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error)
  }
})

//Upload a product
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const uploadProduct = await newProduct.save();
    res.status(200).json(uploadProduct)
  } catch (error) {
    res.status(500).json(error)
  }
})

//Delete a product
router.delete('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)

      if(product.username === req.body.username){
        try {
          await product.delete();
          res.status(200).json('Product successfully deleted');
        } catch (error) {
          res.status(500).json(error);
        }
      }else{
        res.status(401).json('You are not authorized to delete this product');
      }
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update a product
router.put('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)

      if(product.username === req.body.username){
        try {
          const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          },
          {new: true}
          );

          res.status(200).json(updatedProduct);
        } catch (error) {
          res.status(500).json(error);
        }
      }else{
        res.status(401).json('You are not authorized to delete this product');
      }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;