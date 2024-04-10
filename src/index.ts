import { MongoClient } from 'mongodb';

const express = require('express');
const cors = require('cors');
const body = require('body-parser');


async function start() {
  try {

    const app = express();

    app.use(cors());

    const mongo = await MongoClient.connect("mongodb+srv://gregoire:mongoPass@kedubak.9wh2qsp.mongodb.net/?retryWrites=true&w=majority&appName=kedubak");

    await mongo.connect();

    app.db = mongo.db();

    // body parser

    app.use(body.json({
      limit: '500kb'
    }));

    // Routes

    app.use('/', require('./routes/users'));

    // Start server

    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });

  }
  catch(error) {
    console.log(error);
  }
}

start();