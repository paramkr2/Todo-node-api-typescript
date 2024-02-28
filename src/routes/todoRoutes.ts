import {Router} from 'express'
import {getTodo , createTodo} from "../controllers/todos";
import {verificationMiddleware} from '../middlewares/checkuser'

const router = Router();

router.get('/gettodo',verificationMiddleware,getTodo);
router.post('/createtodo',verificationMiddleware,createTodo);

export default router;