require('dotenv').config();

const app = require('./server');
require('./database');

// Server is listening
app.listen(app.get('port'), () => {
  console.log('The value of PORT is:', process.env.PORT);
  console.log('Server on port', app.get('port'));
  console.log('Environment:', process.env.NODE_ENV);
});