## Add your local config file

For Dev, create a file => server/config/config.js

Add below and fill in (config.js is in gitignore)

```
module.exports = {
  mlab: {
    dbuser: 'your_mlab_account',
    dbpassword: 'your_mlab_password'
  },

  expJwt: {
    scrt: 'Shhhhh!'
  },

}; 
```

## Setting up your MongoDB

Add your DB url.  Go to server/db/db.js

There is both a production url, and a testing url which has been comented out.  Once you have your urls, add them in.  

## Setting up your Postmark Email

Create an account on [Postmark](https://postmarkapp.com/).

## Deploying on Heroku

Create a new node app.  Add the stuff from the config.js file to the Env.  