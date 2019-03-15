'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '18d7efb3d6e815a05b95b8c11bd8d5e6',
    channelAccessToken: '9Qcvg2xNr5xl2RSmJUCQJVNxIy4GrsoDHpvyTBI3hXVdjybGZ8YCDNQirYipvIg6Z6esZNcHK/8jSMAZ0Z7V7LkrIWLMhBko92+FM6qIAwub8rgc5zU7kIA3Q4AbplzdF577Acr7LTRyoxB2b0cyOgdB04t89/1O/w1cDnyilFU='}
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
