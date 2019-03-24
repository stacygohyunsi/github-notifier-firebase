# Github Chrome notifier
Find the project [here](https://chrome.google.com/webstore/detail/github-notifier/hoapibhhppbolnldjengllkcdbpbbgih).

Find the medium article for the project [here](https://medium.freecodecamp.org/i-wanted-real-time-github-push-notifications-so-i-built-a-chrome-extension-7e6be0611e4).

# Local Setup
1. Go to (or create) your Firebase project and create a new private key under the Service Accounts settings
2. Place the generated private key into functions/creds.json
3. Go to `functions/config.template.js` and replace your firebase `apiKey`, `databaseURL` (https://xxxxx.firebaseio.com), your `storageBucket` (xxx.appspot.com) and your googleCloudMessaging `serverKey`.
4. Rename your `config.template.js` to `config.js`.


# Usage
1. Remember to `npm install` 
2. Follow instructions from https://firebase.google.com/docs/functions/get-started.
