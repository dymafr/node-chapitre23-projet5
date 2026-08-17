const mongoose = require('mongoose');

exports.clientPromise = mongoose
  .connect(
    process.env.MONGO_URL
  )
  .catch((err) => console.log(err));
