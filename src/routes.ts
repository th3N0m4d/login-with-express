import {Router} from 'express';

import authController from './controllers/auth';
import profileController from './controllers/profile';

const router: Router = Router();

// PROFILE ==================================================

router.get('/profile',
    authController.isAuthenticated,
    profileController.edit,
);

router.get('/register', profileController.index);

router.post('/register', profileController.create);

// AUTH ====================================================

router.get('/login', authController.index);

router.post('/login', authController.login);

router.get('/logout', authController.logout);


export = router
