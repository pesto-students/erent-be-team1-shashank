/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

import 'colors';
import express from 'express';

import fileUpload from 'express-fileupload';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import expressRateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

// Router v1
import rootRouterV1 from 'routes/v1';

// Custom module
import errorHandler from 'middlewares/error';
import configs from 'configs';

// Require db file
import connectDB from 'configs/db';

// Initialize express
const app = express();

// Dev logging middleware
if (configs.env === 'development') {
  // eslint-disable-next-line global-require
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Cookie middleware
app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    keys: ['test'],
    resave: true,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

// Security middlewares
app.use(mongoSanitize());
app.use(helmet());
const limiter = expressRateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);
app.use(hpp()); // prevent http param pollution
app.use(cors());

// File uploading
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB max
  })
);

// Home route (API Details)
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// Root Router
app.use('/api/v1', rootRouterV1);

// Error handler middleware
app.use(errorHandler);

// Start Server
(async () => {
  try {
    // Connect Database
    await connectDB();

    const PORT = configs.port;
    const server = app.listen(PORT, () => {
      console.log(
        `Server Running in ${configs.env} mode on port ${PORT}`.yellow.bold
      );
    });
    // Handle unhandeled promise error
    process.on('unhandledRejection', (err) => {
      console.error(`Error:  ${err.message}`.inverse.red);
      // exit process
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.log(`${error.message}`.red.underline.bold);
    process.exit(1);
  }
})();
