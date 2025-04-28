const mongoose=require('mongoose');
require('dotenv').config()

const mongo_url=process.env.MONGO_URI;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection failed:', err));
