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
    { target: 1, duration: "10s" },
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
  const body = {
                   "uuid":`testuserMateusz_2${randomInt}`,
                   "hardware_id":`testuser_device_Mateusz_2${randomInt}`
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

check(
  response,
  { "Body": (r) => console.log(JSON.stringify(r.body))}
  
);



  // Automatically added sleep
  sleep(1);
}
