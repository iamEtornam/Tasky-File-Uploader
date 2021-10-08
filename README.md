# File-Uploader-API

This service is responsible for file update for the [Tasky Backend Service](https://github.com/RegNex/TaskyBackendService). This is a nodejs app dockerize and deployed to ec2.

## Configuration
1. Rename ```config.example.json``` to ```config.json```
2. Create a aws account and create your s3 storage keys then replace the various values in ```config.json``` with your keys
3. Create a sentry.io account and get your key then replace the various values in ```config.json``` with your key

## run 
1. ``` npm install```
2. ``` nodemon app.js```
3. url: ```localhost:4000/api/v0/upload```

## Deployment
1. ```docker build -t tasky-file-uploader-api .```
2. ```zip -r api.zip .```
3. upload zip file to elasticbeanstalk on aws.com
