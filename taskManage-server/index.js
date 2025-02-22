require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const morgan = require('morgan')

const port = process.env.PORT || 9000
const app = express();
// middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  optionSuccessStatus: 200,
}

// middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('dev'))

// mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@srity.emu4l.mongodb.net/?retryWrites=true&w=majority&appName=Srity`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Ensure the connection is open
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("taskOracleDB");
    const usersCollection = db.collection("users");
    const tasksCollection = db.collection("tasks");

    // ** post task
    app.post('/tasks', async (req, res) => {
      const task = req.body;
      const result = await tasksCollection.insertOne(task);
      res.send(result);
    });

    // ** get task by email
    app.get('/tasks/:email', async (req, res) => {
      const email = req.params.email
      const query = { email }
      const result = await tasksCollection.find(query).toArray();
      res.send(result);
    });

    // ** delete a single task
    app.delete('/delete-single-task/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await tasksCollection.deleteOne(query);
      res.status(200).send(result)
    });

    //  ** get task by id
    app.get('/task-by-id/:id', async (req,res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await tasksCollection.findOne(query);
      res.status(200).send(result)
    })

    // ** update task by id
    app.patch('/task-by-id/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const data = req.body;
      const updateDoc = {
        $set: {
          title: data.title,
          description: data.description,
          dueDate: data.dueDate
        }
      }
      const result = await tasksCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.post('/users/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = req.body;
      const isExist = await usersCollection.findOne(query);
      if (isExist) return res.status(400).send({ message: 'user already exists' });
      const result = await usersCollection.insertOne({ ...user, createdAt: new Date() })
      res.status(200).send(result)
    })

  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

run().catch(console.error);


app.get('/', (req, res) => {
  res.send('Hello from taskOracle Server..')
})
app.listen(port, () => {
  console.log(`taskOracle is running on port ${port}`);
});

