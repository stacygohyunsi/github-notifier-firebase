const config = {
	firebase: {
		apiKey: "YOUR_FIREBASE_WEB_API_KEY", //project overview > settings > General > Web API Key
		databaseURL: "https://XXXX.firebaseio.com", 
		storageBucket: "XXXXX.appspot.com"
	}, 
	googleCloudMessaging: {
		serverKey: "YOUR_CLOUD_MESSAGING_KEY" //project overview > settings > Cloud messaging > Serverkey/Legacy server key
	}
};

module.exports = config;