import { Router } from "express";
import passwordController from '../controllers/passwordController';



const router = Router();

router.get('/', passwordController.getAllPasswords);
router.get('/:id', passwordController.getPasswordById);
router.post('/', passwordController.createPassword);
router.put('/:id', passwordController.updatePassword);
router.delete('/:id', passwordController.deletePassword);

export default router;
