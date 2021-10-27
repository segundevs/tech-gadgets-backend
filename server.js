const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const productRoute = require('./routes/products');

dotenv.config();

//Middlewares
app.use(express.json());
app.use(cors());


//MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(console.log('connected to mongo db'))
  .catch((err)=>console.log(err));


//Image upload/storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer(storage);

app.post('/api/upload', upload.single("file"), (req, res) => {
  res.status(200).json('File successfully uploaded')
})


//API endpoints
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);


//Port listerner
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
  console.log('Backend is running....')
})

