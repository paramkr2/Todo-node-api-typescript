import {Router} from 'express';
import {Login,SignUp} from '../controllers/auth';

const router = Router() 

router.post('/login',Login)
router.post('/signup',SignUp)

export default router ;
