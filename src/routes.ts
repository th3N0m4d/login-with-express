import {Router} from 'express';
import swaggerUi from 'swagger-ui-express';

import authController from './controllers/auth';
import profileController from './controllers/profile';
import homeController from './controllers/home';
import swaggerDoc from './swagger.json';

const router: Router = Router();

// HOME =====================================================

router.get('/',
    authController.isAuthenticated,
    homeController.index,
);

// PROFILE ==================================================

router.get('/register', profileController.index);

router.post('/register', profileController.create);

// AUTH ====================================================

router.get('/login', authController.index);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

// SWAGGER ==================================================

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDoc));

export = router
