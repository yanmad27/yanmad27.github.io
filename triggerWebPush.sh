#!/bin/bash
SERVER_KEY='AAAAj0cpfAA:APA91bGcioSMHlrew4RAs_2SFjZRlXoIB5QIXb_TnEaZfO30zTBsT5uq-UFOkD5Qj24R54QHIKAtpiOM0AM6UamRkUFb-2WDopOIUBSfb2N7uh0yp7nmHYLTvGPp1loHITm6zt8Q3rMo'
DEVICE_REG_TOKEN="ci19F2IjFlu9yOVZoWbSUZ:APA91bG1L9bJNKQfEHLmc6QnVfI0KGlJxLGfanWs1EbxHvh8mFUVKFpPDlMOO1PoFMUk2v6ws84Yy0FW-sK4_IToqGajRCy2buJWOtDgvCs7LZs0lBNNbNYLDSP7V2AqxLl4VSBG4CH4"

CMD=$(cat <<END
curl -X POST -H "Authorization: key=$SERVER_KEY" -H "Content-Type: application/json"
   -d '{
  "data": {
    "title": "FCM Message",
    "body": "This is an FCM Message",
  },
  "to": "$DEVICE_REG_TOKEN"
}' https://fcm.googleapis.com/fcm/send
END
)

echo $CMD && eval $CMD