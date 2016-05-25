# passport-facebook
Use passport.js to authenticate users using their public facebook account info

##notes
Original project had fb.js, db.js, and secretKey.js. Will not work without these.

Also, entire mongo database is ommited (gitignored)

In order to use this repo, 

Add db.js file with 

```javascript
module.exports = {
  'url' : 'mongodb://localhost:27017/yourDB'
}
```

add fb.js file with 

```
module.exports = {
	'appID' : '...',
	'appSecret' : '...',
	'callbackUrl' : 'http://localhost:3000/login/facebook/callback'
}
```

Get your appID and appSecret from facebook developer site

add secretKey.js

```javascript
module.exports = {
  'secret' : '...'
}
```

add your own random value for secret key.
This is used for express sessions.
