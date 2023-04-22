const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGO_CONNECTION_URL } = require('./config');

const client = new MongoClient(MONGO_CONNECTION_URL, {
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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function findUserByLogin(login) {
  try {
    await client.connect();
    const database = client.db('database');
    const users = database.collection('users');
    const user = await users.findOne({ login });
    return user;
  } finally {
    await client.close();
  }
}

async function createUser(user) {
  try {
    await client.connect();
    const database = client.db('database');
    const users = database.collection('users');
    const result = await users.insertOne(user);
    console.log(`New user created with the following id: ${result.insertedId}`);
    const insertedUser = await users.findOne({ _id: result.insertedId });
    return insertedUser;
  } finally {
    await client.close();
  }
}

module.exports = { run, findUserByLogin, createUser };