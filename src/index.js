const dotenv = require('dotenv');

dotenv.config();

const {port} = require('./config');
const app = require('./app');

app.listen(port, () => {
  console.log(`Server is started up on ${port}.`);
});
