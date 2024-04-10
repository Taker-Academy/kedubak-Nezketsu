import { ObjectId } from "mongodb";
import { getEnvVariables } from "../../index";
const jwt = require('jsonwebtoken');

export async function createUserController(req: any, res: any) {
  try {
    const { db } = req.app;

    const { password, firstName, email, lastName } = req.body;
    const { jwt_pass } = getEnvVariables();

    if (!password || !firstName || !email || !lastName) {
      return res.status(400).json({ message: 'Name is required' });
    }

    // check if customer exists

    const existingCustomer = await db.collection('users').findOne({
      email: email.toLowerCase()
    });

    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer already exists' });
    }
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000); // subtract one minute (60,000 milliseconds)
    const result = await db.collection('users').insertOne({
      createdAt: now,
      password,
      email: email.toLowerCase(),
      firstName,
      lastName,
      lastUpVote: oneMinuteAgo,
    });
    const send = {
      email,
      firstName,
      lastName
    }
    const payload = {
      userId: result.insertedId,
    };
    const options = {
      expiresIn: '24h' // Le token expirera après 1 heure
    };
    const token = jwt.sign(payload, jwt_pass, options);
    console.log(result.insertedId);
    if (result.acknowledged) {
      res.json({ ok: true, data: { token, user: send } });
    } else {
      throw new Error('Customer not created');
    }
  }
  catch(error) {
    res.status(500).json({ error: error.toString() });
  }
}