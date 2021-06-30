const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/api-rest-navication';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión a la db correctamente'))
.catch(error => console.log('Error al conectarnos:', error));