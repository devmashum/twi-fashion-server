const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.nextTick.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Middleware

app.use(cors());
app.use(express.json());

// MongoDB full code



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oqyepgg.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const productsCollection = client.db('productsDB').collection('products');
        const nikeCollection = client.db('productsDB').collection('nike');


        // to read the data 
        app.get('/products', async (req, res) => {
            const cursor = productsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/nike', async (req, res) => {
            const cursor = nikeCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })




        // to receive the products add data from client server
        app.post('/products', async (req, res) => {
            const newProducts = req.body;
            console.log(newProducts);
            const result = await productsCollection.insertOne(newProducts);
            res.send(result);
        })
        app.post('/nike', async (req, res) => {
            const newProducts = req.body;
            console.log(newProducts);
            const result = await nikeCollection.insertOne(newProducts);
            res.send(result);
        })

        // app.delete('/nike', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) }
        //     const result = await productsCollection.deleteOne(query);
        //     res.send(result);
        // })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// 

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})

// 
// pass: 
// 