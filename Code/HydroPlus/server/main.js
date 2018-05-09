import { Meteor } from 'meteor/meteor';
import '../imports/api/submitted_data.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  distanceTextMessage(){
    // code to run on server at startup
    // Set up a Twilio account, right now it is in free trial mode
    // Need credientials, located in Twilio Dashboard
    accountSID = 'EnterAccountSIDhere'
    authToken = 'EnterAuthTokenHere'
    // Need to buy a phone number from Twilio
    userPhone = '+enterPhoneNumberHere'
    twilioPhone = '+enterTwilioPhoneNumberHere'
    message = 'You are close to a gauge.'

    // Calls Twilio API
    twilio = Twilio(accountSID, authToken);
    // Sends SMS message to user
    twilio.sendSms({
      to: userPhone,
      from: twilioPhone,
      body:  message
    },
    // Checks to see if response is received from Twilio
    function(err, responseData) {
      // if there's no errors on sending SMS Message to user's phone number
      if (!err) {
        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        // outputs the phone number from Twilio
        console.log(responseData.from);
        // outputs message
        console.log(responseData.body);
      }
    });
  },

  weatherDescriptionTextMessage(weather_description){
    // code to run on server at startup
    // Set up a Twilio account, right now it is in free trial mode
    // Need credientials, located in Twilio Dashboard
    accountSID = 'EnterAccountSIDHere';
    authToken = 'EnterAuthTokenHere';
    // Need to buy a phone number from Twilio
    userPhone = '+enterPhoneNumberHere'
    twilioPhone = '+enterTwilioPhoneNumberHere'
    message = weather_description;

    // Calls Twilio API
    twilio = Twilio(accountSID, authToken);
    // Sends SMS message to user
    twilio.sendSms({
      to: userPhone,
      from: twilioPhone,
      body:  'Today it is ' + message + ' outside.'
    },
    // Checks to see if response is received from Twilio
    function(err, responseData) {
      // if there's no errors on sending SMS Message to user's phone number
      if (!err) {
        // "responseData" is a JavaScript object containing data received from Twilio.
        // outputs the phone number from Twilio
        console.log(responseData.from);
        // outputs message
        console.log(responseData.body);
      }
    });
  },

  // Grab the Open Weather API data for a specific city
  // https://openweathermap.org/current
    getOpenWeather(){
      var result = HTTP.call( 'GET', 'http://api.openweathermap.org/data/2.5/weather?q=flagstaff,US&appid=a187322df7af12ae3558e963fa242a17&units=imperial', {});
      console.log(result.data);
      console.log(result.data.weather[0].main);
      // if(result.data.weather[0].main == 'Rain'){
      //   // console.log(result.data.weather[0].main);
      // }
      Meteor.call('weatherDescriptionTextMessage', result.data.weather[0].main);
    }
});
