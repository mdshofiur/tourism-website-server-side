const express = require('express')
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;

app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e7yhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db('volunteer');
      const volunteerCollection = database.collection('volunteerItems');

      
    // POST API
    app.post('/addnewservice', async (req, res) => {
    const service = req.body;
    const result = await volunteerCollection.insertOne(service);
    res.json(result);
  })
   
  // GET API 
  app.get('/addnewservice', async (req, res) => {
    const cursor = volunteerCollection.find({});
    const services = await cursor.toArray();
    res.json(services);
  })
      


    } finally {
     // await client.close();
    }
  }
  run().catch(console.dir);



app.get('/', function (req, res, next) {
  res.json("This is CORS-enabled for all origins!")
})

app.listen(port, function () {
  console.log('CORS-enabled web server listening on port 500')
})