// import firebase from "firebase/app";
// import "firebase/messaging";

const pushOpts = {
  HOST_ENV: "https://app-stag.primedata.ai/ec.js",
  source: "JS-1rBmmUFvKk7uCUn0NAhqIqvw1EO",
  POWEHI_URL: "https://powehi-stag.primedata.ai",
  writeKey: "1rBmmTYdRljPZCezA8KbBtTZQPd"
};

var VAPID_KEY = "BNGGRmSbmwVN0MO-xnqBSNQ013nSrX5YG25agm_DHXIAce8JEIY3R0ZBh6PLhkzjwLRg6FOKYxXJMK65soeC6vo";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDbHQHcynAHbb6IUrhTghw4rc5XHu28h5M",
  authDomain: "primedata-ai.firebaseapp.com",
  databaseURL: "https://primedata-ai.firebaseio.com",
  projectId: "primedata-ai",
  storageBucket: "primedata-ai.appspot.com",
  messagingSenderId: "914795230254",
  appId: "1:914795230254:web:644e302f5b9771952a9bbf",
  measurementId: "G-9H6D3M66JK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var wps = {};

wps.getMessagingObject = function () {
  // [START messaging_get_messaging_object]
  var messaging = firebase.messaging();
  // [END messaging_get_messaging_object]
};

wps.receiveMessage = function () {
  var messaging = firebase.messaging();
  // [START messaging_receive_message]
  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.onBackgroundMessage` handler.
  var enableForegroundNotification = true;
  console.log("ReceiveMessageInit");
  messaging.onMessage(function (payload) {
    console.log("Message received. ", payload);
    NotisElem.innerHTML =
      NotisElem.innerHTML + JSON.stringify(payload);

    if (enableForegroundNotification) {
      var data = payload.data;
      navigator.serviceWorker
        .getRegistrations()
        .then((registration) => {
          registration[0].showNotification(data.title, data);
        });
    }
  });
  // [END messaging_receive_message]
};


wps.getToken = function () {
  var messaging = firebase.messaging();
  // [START messaging_get_token]
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging.getToken({vapidKey: VAPID_KEY}).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      this.notification_token = currentToken;
      follower.track("reached_channel", {"web_push": {"notification_token": currentToken}});

      console.log("Token generated: \"" + currentToken + "\"");
    } else {
      // Show permission request UI
      console.log("No registration token available. Request permission to generate one.");
    }
  }).catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });
  // [END messaging_get_token]
};

wps.requestPermission = function () {
  // // [START messaging_request_permission]
  var messaging = firebase.messaging();
  messaging
    .requestPermission()
    .then(function () {
      MsgElem.innerHTML = "Notification permission granted.";
      console.log("Notification permission granted.");
    })
    .catch(function (err) {
      ErrElem.innerHTML = ErrElem.innerHTML + "; " + err;
      console.log("Unable to get permission to notify.", err);
    });
  // // [END messaging_request_permission]
};

/**
 * uuid
 * @returns {string}
 */
wps.uuidByte = function () {
  let firstPart = (Math.random() * 46656) | 0;
  let secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

wps.deleteToken = function () {
  var messaging = firebase.messaging();

  // [START messaging_delete_token]
  messaging.deleteToken().then(() => {
    console.log("Token deleted.");
    // ...
  }).catch((err) => {
    console.log("Unable to delete token. ", err);
  });
  // [END messaging_delete_token]
};


wps.initWebPushSDK = function () {
  wps.requestPermission();
  wps.getToken();
  wps.receiveMessage();
};

wps.initContext = function (config) {
  let opts = {
    scope: config.source,
    url: config.POWEHI_URL,
    writeKey: config.writeKey,
    initialPageProperties: {
      pageInfo: {
        destinationURL: window.location.href
      }
    }
  };
  !function () {
    var follower = window.follower = window.follower || [];
    if (!follower.initialize) if (follower.invoked) window.console && console.error && console.error("PrimeDATA snippet included twice."); else {
      follower.invoked = !0;
      follower.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "personalize", "identify", "initialize", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on", "addSourceMiddleware", "addIntegrationMiddleware", "setAnonymousId", "addDestinationMiddleware"];
      follower.factory = function (t) {
        return function () {
          var e = Array.prototype.slice.call(arguments);
          e.unshift(t);
          follower.push(e);
          return follower;
        };
      };
      for (var t = 0; t < follower.methods.length; t++) {
        var e = follower.methods[t];
        follower[e] = follower.factory(e);
      }
      follower.load = function (t, e) {
        var n = document.createElement("script");
        n.type = "text/javascript";
        n.async = !0;
        n.src = config.POWEHI_URL + "/mining.js";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(n, a);
        follower._loadOptions = e;
      };
      follower.SNIPPET_VERSION = "0.1.0";
      follower.load();
      follower.initialize({"Prime Data": opts});
      wps.initWebPushSDK();
    }
  }();

}(pushOpts);
