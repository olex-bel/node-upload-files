const path = require('path');

module.exports = {
  entry: './ui/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './public/js/dist'),
  },
};
