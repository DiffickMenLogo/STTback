const express = require('express')
const { PORT } = require('./config');
const {run} = require('./database');

const auth = require('./routes/auth.router');
const cors = require('cors');

const app = express()

app.use(express.json({ extended: true }));
app.use(cors());

app.use(auth);

async function start() {
    try{
        run().catch(console.dir);

    app.listen(PORT, () => {
        console.log(`App is running on http://localhost:${PORT}`);
    });
    }catch(e){
        console.log(e)
    }
}

start();