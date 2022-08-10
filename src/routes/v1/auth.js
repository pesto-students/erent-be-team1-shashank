import express from 'express';

// Controllers
import { login } from 'controllers/auth.controller';

const router = express.Router();

router.route('/login').post(login);

export default router;
