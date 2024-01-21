import { Router } from "express";
import UserController from "../controllers/users.controller";

const router = Router();


router.post('/login', UserController.login());
router.get('/verify', UserController.verify());
router.put('/changePassword/:id_user', UserController.changePassword())

router.get('/', UserController.getUsers());
router.get('/:user_id', UserController.getUserById());
router.post('/register', UserController.createUser());
router.put('/:user_id', UserController.updateUser());
router.delete('/:user_id', UserController.deleteUser());


export default router;