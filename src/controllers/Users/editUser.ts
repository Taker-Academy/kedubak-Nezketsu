import { MongoClient, ObjectId } from 'mongodb'; // Assurez-vous d'importer ObjectId
const jwt = require('jsonwebtoken');
import { getEnvVariables } from "../../index";



export async function editUserController(req: any, res: any) {
    try {
        const { db } = req.app;
        const authHeader = req.headers['authorization'];
        const { jwt_pass } = getEnvVariables();
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const decoded = jwt.verify(token, jwt_pass);
            const id = decoded.userId;

            const ID = new ObjectId(id);
            const { email: newEmail, password: newPassword, firstName: newFirstName, lastName: newLastName } = req.body;
            console.log(newEmail);
            console.log(ID);
            await db.collection('users').updateOne(
                { _id: ID },
                {
                    $set: {
                        email: newEmail,
                        password: newPassword,
                        firstName: newFirstName,
                        lastName: newLastName
                    }
                }
            );
            const send = {
                newEmail,
                newFirstName,
                newLastName
            };
            res.json({ ok: true, data: { user: send } });
        } else {
            res.status(401).json({ ok: false, message: 'Non autorisé. Token JWT manquant dans l\'en-tête Authorization' });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l’utilisateur :', error);
        res.status(500).json({ error: error.toString() });
    }
}