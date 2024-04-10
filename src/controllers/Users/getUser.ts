import { ObjectId } from "mongodb";
const jwt = require('jsonwebtoken');
import { getEnvVariables } from "../../index";


export async function getUserController(req: any, res: any) {
  try {
    const { db } = req.app;
    const { email, password } = req.body;
    const { jwt_pass } = getEnvVariables();

    if (!email || !password) {
      console.log(email, password);
      return res.status(400).json({ message: 'User ID is required' });
    }
    const result = await db.collection('users').findOne({
      email: email,
      password: password
    });
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    const send = {
      email,
      firstName: result.firstName,
      lastName: result.lastName
    }
    const payload = {
      userId: result.insertedId,
    };
    const options = {
      expiresIn: '24h' // Le token expirera après 1 heure
    };
    const token = jwt.sign(payload, jwt_pass, options);
    res.json({ ok: true, data: { token, user: send} });
  }
  catch(error) {
    res.status(500).json({ error: error.toString() });
  }
}