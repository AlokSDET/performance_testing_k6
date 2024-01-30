import http from 'k6/http';
import { sleep,check, group } from 'k6';
import exec from 'k6/execution';
import {Counter, Trend} from 'k6/metrics';
import {randomIntBetween, randomString, randomItem} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';


let userCsvCredentials =  new SharedArray('user credentials from csv', function() {
  return  papaparse.parse(open('./data.csv'), {header:true}).data;
})

let userJsonCredentials =  new SharedArray('user credentials from json', function() {
  return  JSON.parse(open('./data.json')).users;
})

console.log("jsoncred" + userJsonCredentials);
console.log(userJsonCredentials.forEach((userCred) => {userCred.userName}));

console.log("csvCred"+ userCsvCredentials);
console.log(userCsvCredentials.forEach((userCred) => {userCred.userName}));

export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    // During the whole test execution, the error rate must be lower than 1%.
    http_req_failed: ['rate<0.01'],
    my_counter: ['count>10'],
    timingDuration: ['p(95)>150', 'p(90)>200'],
    'http_req_duration{status:200}': ['p(95)<1000'],
    'group_duration{group:::pizza grp }' : ['p(95)<1000'],
  },
  ext: {
    loadimpact: {
      ProjectID: 123455
    }
  },
   /* stages: [ 
    {
      duration: '10s',
      target: 1000
    },
    {   
      duration: '10s',
      target: 1000
    }],*/
};

let myCounter = new Counter('my_counter');
let newPageResponseTiming = new Trend('timingDuration');


export function setup() {
  //let gResponse = http.get('https://test.k6.local/status');
  console.log(__ENV.BASE_URL);
  console.log('username' + userJsonCredentials.forEach((userCred) => userCred.username));
  console.log('username' + userCsvCredentials.forEach((userCred) => userCred.username))

  let gResponse = http.get('https://test.k6.io');
  sleep(1);
  if (gResponse.error) {
    exec.test.abort('Aborting test. Application is down' );
  }

console.log('setup stage');
  const data = {foo: 'bar'};
  return data;
}
export default function (data) {
  let gCResponse = http.get('https://test-api.k6.io/public/crocodiles/');
  const crocodiles = gCResponse.json();
  console.log(crocodiles.map(item => item.id));
  const ids = crocodiles.map(item => item.id);
  console.log(ids);
console.log(randomItem(ids));

  console.log(data);
  let gResponse = http.get('https://aqueous-brook-60480.herokuapp.com/todos/');
  console.log(((gResponse.json())[0].task));

  console.log(gResponse.headers['Content-Type']);
  sleep(1);
  if (gResponse.error) {
    exec.test.abort('Aborting test. Application is down' );
  }
  check(gResponse, {
    'is status 200': r => r.status === 200,
  })
  myCounter.add(1);
  const randomNumber = randomIntBetween(1,5);
  group ('pizza grp', function() {
    gResponse = http.get('https://pizza.grafana.fun/');
    sleep(randomNumber);
    newPageResponseTiming.add(gResponse.timings.duration);
  });

  console.log(__ENV.BASE_URL);
  const url = `${__ENV.BASE_URL}/api/authaccount/login`;
  const randomName = randomString(8);

 // const url = 'http://restapi.adequateshop.com/api/authaccount/login';
  const payload = JSON.stringify({
    email: `alok${randomName}`,
    password: '123456',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    tags: {
      name: 'login_adequateshop'
    }
  };

  let pResponse = http.post(url, payload, params);
  console.log(pResponse.body);
  check(pResponse, {
    'is status 200': r => r.status === 200,
  })

  check(pResponse, {
    'body includes data': r => r.body.includes('alok.s@gmail.com'),
    'is status 200': r => r.status === 200,
  })

  let gCsvJsonResponse = http.get('https://aqueous-brook-60480.herokuapp.com/todos/');
}

export function teardown() {
  console.log('teardown stage');
}