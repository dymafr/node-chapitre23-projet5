const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://alex:qwe@cluster0-l4izx.gcp.mongodb.net/twitter?retryWrites=true', { 
  useNewUrlParser: true
}).then( () => console.log('connexion db ok !')).catch( err => console.log(err));