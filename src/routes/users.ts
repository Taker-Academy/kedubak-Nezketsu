import { createUserController } from "../controllers/Users/createUser";
import { getUserController } from "../controllers/Users/getUser";
import { getUsersController } from "../controllers/Users/getUsers";
import { editUserController } from "../controllers/Users/editUser";
import { deleteUserController } from "../controllers/Users/deleteUser";

const express  = require('express');

const router = express.Router();

console.log('customers route');

router.post('/auth/register', createUserController);
router.post('/auth/login', getUserController);
router.get('/user/me', getUsersController);
router.put('/user/edit', editUserController);
router.delete('/user/remove', deleteUserController);

module.exports = router;