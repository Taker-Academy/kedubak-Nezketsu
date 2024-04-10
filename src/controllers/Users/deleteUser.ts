import { MongoClient, ObjectId } from 'mongodb'; // Assurez-vous d'importer ObjectId
const jwt = require('jsonwebtoken');

export async function deleteUserController(req: any, res: any) {
    try {
        const { db } = req.app;
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Accès refusé. Token manquant ou mal formé.' });
        }
        const token = authHeader.substring(7);
        let decoded = jwt.verify(token, 'caca'); // Utilisez la clé secrète réelle ici
        const userId = decoded.userId;
        console.log(userId);
        const userToDelete = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        if (!userToDelete) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });

        res.status(200).json({
            ok: true,
            data: {
                email: userToDelete.email,
                firstName: userToDelete.firstName,
                lastName: userToDelete.lastName,
                removed: true
            }
        });
    } catch (error) {
        console.error('Erreur lors de la suppression de l’utilisateur :', error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur." });
    }
}