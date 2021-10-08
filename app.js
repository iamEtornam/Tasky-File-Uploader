const express = require('express');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config();
const imageUploader = require('./image_controller');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const env = process.env.NODE_ENV || 'development';

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

Sentry.init({
  environment: env,
    dsn: process.env.SENTRY_KEY,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ 
        // to trace all requests to the default router
        app, 
        // alternatively, you can specify the routes you want to trace:
        // router: someRouter, 
      }),
    ],
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });


  // RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// the rest of your app

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