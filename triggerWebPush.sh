#!/bin/bash
SERVER_KEY='AAAA1P4LdC4:APA91bHCJHs4gs2-DKAIgthnHdH2qfPfKK3mV1Dz2i5BcbGCR4nZ-8dWEekFipk9edn1DWcFov81kY_vgfdW0asmucSQ5Dp4Kjw3t3UkuhHKa821i1jAheCGNIOo-okQIDkqzExmV71X'
DEVICE_REG_TOKEN='token'

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