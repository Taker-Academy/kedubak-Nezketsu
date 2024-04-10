import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();
const jwt_pass = process.env.JWT_NAME;

type Env = {
  port: number;
  databaseUrl: string;
  jwt_pass: string;
};

export function getEnvVariables(): Env {
  return {
    port: parseInt(process.env.PORT, 10),
    databaseUrl: process.env.DATABASE_URL,
    jwt_pass: process.env.JWT_NAME,
  };
}

const express = require('express');
const cors = require('cors');
const body = require('body-parser');


async function start() {
  try {

    const { port, databaseUrl } = getEnvVariables();

    const app = express();

    app.use(cors({
      origin: '*',
    }));

    const mongo = await MongoClient.connect(databaseUrl);

    await mongo.connect();

    app.db = mongo.db();

    // body parser

    app.use(body.json({
      limit: '500kb'
    }));

    // Routes

    app.use('/', require('./routes/users'));

    // Start server

    app.listen(port, () => {
      console.log('Server is running on port 8080');
    });

  }
  catch(error) {
    console.log(error);
  }
}

start();