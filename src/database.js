const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("database").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.error(e);
    process.exit(1); // Exit the process if connection fails
  }
}

async function findUserByLogin(login) {
  try {
    const database = client.db('database');
    const users = database.collection('users');
    const user = await users.findOne({ login });
    return user;
  } catch (e) {
    console.error(e);
  }
}

async function createUser(user) {
  try {
    const database = client.db('database');
    const users = database.collection('users');
    const result = await users.insertOne(user);
    console.log(`New user created with the following id: ${result.insertedId}`);
    const insertedUser = await users.findOne({ _id: result.insertedId });
    return insertedUser;
  } catch (e) {
    console.error(e);
  }
}

async function getAllBooks() {
  try {
    const database = client.db('database');
    const books = database.collection('books');
    const result = await books.find().toArray();
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function createBook(book) {
  try {
    const database = client.db('database');
    const books = database.collection('books');
    const result = await books.insertOne(book);
    const resultBook = await books.findOne({_id: result.insertedId});
    await createAuthor(resultBook.author);
    return resultBook;
  } catch (e) {
    console.error(e);
  }
}

async function createAuthor(name){
  try{
    const database = client.db('database');
    const authors = database.collection('authors');
    const existingAuthor = await authors.findOne({ name });
    if (existingAuthor) {
      console.log('Author already exists');
    } else {
      await authors.insertOne({ name });
      console.log(`New author ${name} added to database`);
    }
    
  } catch (e) {
    console.error(e);
  }
}

async function getAllAuthors(){
  try{
    const database = client.db('database');
    const authors = database.collection('authors');
    const result = await authors.find().toArray()
    return result
  } catch(e){
    console.log(e);
  }
}

async function deleteBook(bookId) {
  try {
    const database = client.db('database');
    const books = database.collection('books');
    const result = await books.deleteOne({_id: new ObjectId(bookId)});
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function findOneBook(title) {
  try {
    const database = client.db('database');
    const books = database.collection('books');
    const book = await books.findOne({title});
    return book;
  } catch (e) {
    console.error(e);
  }
}

async function close() {
  try {
    await client.close();
    console.log('MongoDB connection closed.');
  } catch (e) {
    console.error(e);
  }
}

module.exports = { run, findUserByLogin, createUser, getAllBooks, findOneBook, deleteBook, close, createAuthor, createBook, getAllAuthors}
