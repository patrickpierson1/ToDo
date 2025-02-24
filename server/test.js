const { MongoClient } = require('mongodb');
const uri = "mongodb://admin:alpine2112@342.yonkers.dev:27017/dbname?authSource=admin";
console.log("Started");
MongoClient.connect(uri, (err, client) => {
  if (err) return console.error(err);
  console.log("Connected");
  client.close();
});