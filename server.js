'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: 'd828856979432333aeebe81cd0fd85a4',
    channelAccessToken: 'g3tCQHG2/pWnBOi1pbLU0M8r6Nc0mrpT8d8gZzlvGhMNuE4DuTU3pM+mJk6TRJl+SIud77qdu23kfajjvSNWzadU/Xe1K2mbeHFRxLQ9HMFprI9gtl3e2AUmfsCz0sNsVdFnADN0jzXF0J1BP+oQpAdB04t89/1O/w1cDnyilFU='};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
