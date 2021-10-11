import http from 'k6/http';
import { check, group, sleep } from 'k6';

export default function () {

    let randomInt = Math.floor(Math.random() * 1000000);

    // staging i prod
    const staging = `https://mobile-staging.uberchord.com`;
    const prod = `https://mobile.uberchord.com`;

    // endpoint do tworzenia/usuwania i logowania
    const users = `/v1/users`;
    const sessions = `/v1/sessions`;

    //body
    const bodyCreateUser = {
        "email": `MateuszTest${randomInt}@yopmail.com`,
        "password": "qwerty1234",
        "fullName": "Mateusz QA"
    };
    // headers
    const params = {
        headers: {
            'Session-Token': ''
        }
    }

    // tworzenie usera
    let res = http.post(staging + users, bodyCreateUser, params);

    // wyciągnięcie tokena z odpowiedzi
    const test = JSON.parse(res.body)
    //console.log('sessionToken= ',test.sessionToken);
    const sessionToken = test.sessionToken;

    // odczyt danych usera
    let res2 = http.post(staging + sessions, bodyCreateUser, params);
    //console.log(res2.body)
    
    // usuwanie usera 
    http.del(staging + users, bodyCreateUser, {
        headers: {
            'Session-Token': sessionToken
        }
    });


    // sprawdzanie czy został usunięty
    //http.post(staging + sessions, bodyCreateUser, params);
};