import http from 'k6/http';
import { check, group, sleep } from 'k6';

let randomInt = Math.floor(Math.random() * 1000000);

const staging = `https://mobile-staging.uberchord.com`;
const prod = `https://mobile.uberchord.com`;
const users = `/v1/users`;
const sessions = `/v1/sessions`;

// body
const bodyCreateUser = {
    "email": `MateuszTest${randomInt}@yopmail.com`,
    "password": "qwerty1234",
    "fullName": "Mateusz QA"
};
// headers for user creation and to log in
const params = {
    headers: {
        'Session-Token': ''
    }
}

// Test setup
export let options = {
    stages: [
        { duration: '10s', target: 50 },
        { duration: '30s', target: 50 },
        { duration: '10s', target: 0 },
    ]
};

// Test scenario
export default function () {

    //user creation
    let res = http.post(prod + users, bodyCreateUser, params);

    //retrieving a token from the response.
    const test = JSON.parse(res.body);
    const sessionToken = test.sessionToken;

    //logging in to the created user.
    let res2 = http.post(prod + sessions, bodyCreateUser, params);
    
    //deleting the created user.
    http.del(prod + users, bodyCreateUser, {
        headers: {
            'Session-Token': sessionToken
        }
    });
};