const functions = require('firebase-functions');
const firebase = require('firebase');
const config = require('./config');
const request = require('request');
const events = require('typeof-github-event');
var admin = require('firebase-admin');
const serviceAccount = require('./creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://notifier-5de7f.firebaseio.com'
});

firebase.initializeApp(config.firebase);

exports.test = functions
  .region('asia-northeast1')
  .https.onRequest((request, response) => {
  response.send("test");
  });

exports.savedata = functions
  .region('asia-northeast1')
  .https.onRequest((req, res) => {
    var username = req.body.githubUsername;
    var registrationId = req.body.registrationId;
    const db = admin.database();
    var ref = db.ref(username);
    ref.once("value", function(snapshot) {
      var present = false;
      if (snapshot.val()) {
        Object.keys(snapshot.val()).forEach(function(key) {
          if (snapshot.val()[key] === registrationId) {
            present = true;
          }
        });
      }
      if (present === false) {
        ref.push().set(registrationId)
        .then(function() {
          res.json('success!');
        }).catch(function(err) {
          res.json('An error occurred:', err);
        })
      } else {
        res.json('added already');
      }
    });
  });

exports.watch = functions
  .region('asia-northeast1')
  .https.onRequest((req, res) => {
    var ids = [];
    var type = events.typeof(req.body);  
    firebase.database().ref(req.body.repository.owner.login).on("value", function(snapshot) {
      snapshot.forEach(function(id) {
        if (ids.indexOf(id.val()) === -1) {
          ids.push(id.val());
        }
      });
      request({
        url: 'https://gcm-http.googleapis.com/gcm/send',
        method: 'POST',
        headers: {
          'Content-Type' :' application/json',
          'Authorization': config.googleCloudMessaging.serverKey
        },
        body: JSON.stringify(
          { "data": {
            "message": {
              'action': type,
              'name': req.body.repository.name,
              'sender': req.body.sender.login
            }
          },
            "registration_ids": ids
          }
        )
      }, function(error, response, body) {
        if (error) { 
          console.error(error, response, body); 
        }
        else if (response.statusCode >= 400) { 
          console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
        }
        else {
          console.log('Done!')
        }
      });		
    });
    res.send();  
  });
