const {Game} = require('./index.js');

Game.findAll().then(data => {
  console.log("All data:", JSON.stringify(data, null, 4));
});
