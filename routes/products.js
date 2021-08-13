const router = require('express').Router();
const user = require('../models/User');
const Product = require('../models/Product');


//Get a product
router.get('/:id', async (req, res) => {
  try {
    const product = Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
})

//Create a product
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const uploadProduct = await newProduct.save();
    res.status(200).json(uploadProduct)
  } catch (error) {
    res.status(500).json(error)
  }
})


module.exports = router;