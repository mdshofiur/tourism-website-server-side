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
      const BookingCollection = database.collection('BookingCollection');

      
    // POST API
    app.post('/bookingitem', async (req, res) => {
    const service = req.body;
    const result = await volunteerCollection.insertOne(service);
    res.json(result);
  })
   
  // GET API 
  app.get('/bookingitem', async (req, res) => {
    const cursor = volunteerCollection.find({});
    const services = await cursor.toArray();
    res.json(services);
  })
      
  
// Get Single API

  app.get('/bookingitem/:serviceId', async (req, res) => {
  const id = req.params.serviceId;
  const query = {_id: ObjectId(id)};
  const service = await volunteerCollection.findOne(query);
  res.json(service);
  })
   
  
  // Booking Post API
    
  app.post('/myorders', async (req, res) => {
    const service = req.body;
    const result = await BookingCollection.insertOne(service);
    res.json(result);
  })


  // All Order Api 

  app.get('/myorders', async (req, res) => {
    const cursor = BookingCollection.find({});
    const services = await cursor.toArray();
    res.json(services);
  })


  app.get('/myorders/:email', async (req, res) => {
      const result = await BookingCollection.find({ 
        LogEmail: req.params.email
      }).toArray();
      res.send(result);
  })



  // Delete Api

  app.delete('/myorders/:id', async (req,res) => {
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await BookingCollection.deleteOne(query);
    res.send(result);
  })


  // Update APi

  app.put('/myorders/:id', async (req, res) => {
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        status: "Approved",
      },
    }
    const result = await BookingCollection.updateOne(query,updateDoc,options);
    res.json(result);
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