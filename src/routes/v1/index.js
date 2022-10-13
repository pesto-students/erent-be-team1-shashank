import express from 'express';

import authRouter from './auth';
import listingsRouter from './listings';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/listings', listingsRouter);

export default rootRouter;
