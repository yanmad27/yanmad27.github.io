#!/bin/bash
SERVER_KEY='AAAAvwBsQyE:APA91bFT9x0ZApGe6A1_ihjZqFsjPkJLGRzG06gwCwP5Adhf7QIPH3Ioat0HJJTXYkqB3scLuoXCZricemFI8hne6uVvPe9Wy1QATdW6vdvMnoo9Z-KNYccpKLHbkaNnB3VfE0b16qVg'
DEVICE_REG_TOKEN='d2PzBlNpP0e8WkYQvXMW_z:APA91bHOlqLGDsG8mYMNjG2yy28Mav5NbubxCq9O9oIvLRIbkfLqy__EwEEISdr9UJExyhxnCXCHx58ikBWY4Sr9BWWXqhKLK8V5_yppnBTR724sO1Mj5aMFGU_AmOMGyX7Jmy68tPdL'

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