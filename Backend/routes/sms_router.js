const express = require('express');
const router = express.Router();
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

/*{
	"from": "+16406008632",
	"to": "+917008786943",
	"body": "hello sourav"
}*/
router.post('/sendSms', (req, res) => {
    const { from, to, body } = req.body
    if (!from || !to || !body) {
        return res.status(400).json({ error: "One or more mandatory field is empty" });
    }
    client.messages
    .create({
        body: body,
        from: from,
        //messagingServiceSid: 'MG3fbb418d2e1a9b7d8c02fd8a7006e5cc',
        to: to
    })
    .then(message => {
        console.log(message.sid);
        return res.status(200).send("sms sent successfully")
    });
})

module.exports = router;
