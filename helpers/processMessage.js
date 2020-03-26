require("dotenv").config();

const API_AI_TOKEN = process.env.CLIENT_TOKEN;
const apiAiClient = require("apiai")(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = process.env.FB_TOKEN;
const request = require("request");
const sendTextMessage = (senderId, text) => {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: "POST",
    json: {
      recipient: { id: senderId },
      message: { text }
    }
  });
};
module.exports = event => {
  const senderId = event.sender.id;
  const message = event.message.text;
  const apiaiSession = apiAiClient.textRequest(message, {
    sessionId: "crowdbotics_bot"
  });
  apiaiSession.on("response", response => {
    const result = response.result.fulfillment.speech;
    sendTextMessage(senderId, result);
  });
  apiaiSession.on("error", error => console.log(error));
  apiaiSession.end();
};
