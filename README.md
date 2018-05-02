
# MyApp



## Install express and ejs
```sh
$ npm install express --save
$ npm install ejs --save
$ npm install body-parser --save
$ npm install mongoose --save
$ npm install mongoose-auto-increment --save
$ npm install compression --save
$ npm install cookie-parser --save
$ npm install cookie-session --save
```

References : 
https://www.npmjs.com/package/mongoose-auto-increment

## Adding SASS
```sh
$ npm install --save-dev node-sass
```

Adding to package.json a script to compile the css files from public folder into one + our style in the sass file (ref: https://medium.com/@brianhan/watch-compile-your-sass-with-npm-9ba2b878415b)
 ```sh
$ npm run build-css
```

## Token verification and encryption
```sh
$ npm install bcrypt --save
$ npm install jwt-express --save
```


/*here*/

## Perform backed job queue
https://github.com/Automattic/kue
```sh
$ npm install monq --save
```



## Sending email 
https://www.sparkpost.com/
```sh
$ npm install sparkpost --save
```


## Real-time updates
https://www.npmjs.com/package/socket.io
```sh
$ npm install socket.io --save
```

## Testing
mocha



## Deploying
### Mlab for mongodb database
https://mlab.com/welcome/


### Node server : Heroku
Add Procfile
- 
web : npm start
worker npm run worker
heroku config set
git push heroku master


## font-end
surge


## Extra
separate front-back
SSL certificate
monitor: uptimerobot
email signup (send: json token)
staging env (docker)
CDN for images/scripts/videos


