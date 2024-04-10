const jwt = require('jsonwebtoken');
import { MongoClient, ObjectId } from 'mongodb'; // Assurez-vous d'importer ObjectId


export async function getUsersController(req: any, res: any) {
  try {
    const { db } = req.app;

    const result = await db.collection('users').find().toArray();
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
          jwt.verify(token, 'caca');
        } catch (error) {
          return res.status(403).json({ message: 'Accès refusé. Token invalide.' });
        }
      }
    const send = {
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName
    }
    res.status(200).json({ ok: true, data: { user: send} });
  }
  catch(error) {
    res.status(500).json({ error: error.toString() });
  }
}