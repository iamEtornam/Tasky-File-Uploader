const express = require('express');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config();
const imageUploader = require('./image_controller');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const app = express();
app.use(cors())
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ limit: '100mb' }));

Sentry.init({
  dsn: process.env.SENTRY_API_KEY,
  environment: process.env.NODE_ENV,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


app.use(logger("dev"));
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
  
const port = process.env.PORT || 4000;
app.get('/', (req, res) => res.status(200).send({
    message: `Live on port: ${port}`,
}));
app.use('/api/v0/upload', imageUploader);
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
    console.log(`Server url localhost:${port}/api/v0/upload`);
});