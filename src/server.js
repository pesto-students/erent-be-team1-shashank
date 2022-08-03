import path from 'path';

import colors from 'colors';
import express from 'express';

import fileUpload from 'express-fileupload';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import expressRateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

// Custom module
import errorHandler from './middlewares/error';
import configs from './config';

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

// Security middlewares
app.use(mongoSanitize());
app.use(helmet());
const limiter = expressRateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);
app.use(hpp()); // prevent http param pollution
app.use(cors());

// File uploading
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  })
);

// Home route (API Details)
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// Error handler middleware
app.use(errorHandler);

// Start Server
(async () => {
  try {
    const PORT = configs.port || 8080;
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