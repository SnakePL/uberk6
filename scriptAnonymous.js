import { check, sleep } from "k6";
import http from "k6/http";

export const options = {
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
      },
    },
  },
  stages: [
    { target: 10, duration: "3s" },
    // { target: 50, duration: "8m" },
    // { target: 0, duration: "2m" },
  ],
  thresholds: {},
};

export default function main() {
  let response;
      // Random e-mail suffix
      let randomInt = Math.floor(Math.random() * 1000000);

  const API_URL_STAGING = "https://mobile-staging.uberchord.com";
  const API_URL_PROD = "https://mobile.uberchord.com";
  const userID = `testuserMateusz_2${randomInt}`;
  const hardwareID = `testuser_device_Mateusz_2${randomInt}`
  const body = {
                   "uuid":userID,
                   "hardware_id":hardwareID
               };

  // Prod Sign-UP Anonymous User
  response = http.post(
    `${API_URL_STAGING}/v1/users/anonymous`,
    //zmieniam obiekt na string
     JSON.stringify(body),
    {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Uberchord/2.9.3 (iPhone; iOS 13.4; Scale/2.00; gzip)",
        "Accept-Encoding": "gzip",
        Accept: "application/json",
      },
    }
  );
  check(
    response,
    { "Create user response status code is 201": (r) => r.status == 201 }

    
);

// check(
//   response,
//   { "Body": (r) => console.log(JSON.stringify(r.body))}
  
// );
check(
  response,
  { "Hardware id + user id": (r) => {
    const test = JSON.parse(r.body)
    console.log('hardwareID= ',test.hardware_id);
    console.log('userID= ',test.anonymousAuthData.id)
    return test.hardware_id === hardwareID && test.anonymousAuthData.id === userID
  }}
  
);
// check(
//   response,
//   { "hardware_id": (r) => console.log(r.body[0])}
  
// );
// check(
//   response,
//   { "uuid": (r) => console.log(r.body.anonymousAuthData.id)}
  
// );
  // Automatically added sleep
  sleep(1);
}
// {
//   "_id":"61449028c1c72000138cae23",
//   "createdAt":"2021-09-17T12:55:04.095Z",
//   "updatedAt":"2021-09-17T12:55:04.444Z",
//   "fullName":"",
//   "firstName":"",
//   "lastName":"",
//   "sessionToken":"b0f5372018347a3bcc10b1e0b64e7792",
//   "anonymousAuthData":{
//      "id":"testuserMateusz_2462952",
//      "createdAt":"2021-09-17T12:55:04.327Z"
//   },
//   "hardware_id":"testuser_device_Mateusz_2462952",
//   "isFirstHardwareUser":true,
//   "acceptedTCPP":false,
//   "subscribedToNewsletter":false,
//   "isNewAccount":true,
//   "progress":{
//      "_id":"61449028c1c72000138cae24",
//      "_created_at":"2021-09-17T12:55:04.095Z",
//      "_updated_at":"2021-09-17T12:55:04.095Z"
//   },
//   "inventory":{
     
//   },
//   "campaigns":[
     
//   ],
//   "userSubscription":null
// }