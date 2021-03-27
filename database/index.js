const mongoose = require('mongoose');

exports.clientPromise = mongoose
  .connect(
    'mongodb+srv://alex:qwe@cluster0-l4izx.gcp.mongodb.net/twitter?retryWrites=true',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .catch((err) => console.log(err));
