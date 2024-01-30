---
runme:
  id: 01HMDWBFZJRDT0TSNGCC7TKBG5
  version: v2.2
---

```sh {"id":"01HMDWBMPATMRBW0ZRKSA1PTAN"}
create node project 
and install k6

run command 'k6 run k6.js'

------------------------------------------

sign up in influx db 
create organisation and bucket name
create a js file and paste code 
run file using 'node node.js'

-----------------
Signup in Grafana Cloud and K6 cloud
install k6
create file.js
run 'k6 run k6.ks'
login in cloud 'k6 login cloud -t token'  https://app.k6.io/tests/new/cli
run in cloud 'k6 cloud k6.js'
run locally and stream result in k6 cloud - 'k6 run -o cloud k6.js'

we can create test cases in Test Builder grafana, can record test using k6 plugin in Chrome.
K6 is for dashboard
Grafana is to create new test cases  by test script or builder or even recorded tests will be saved in grafana default project.
Env variable - pass env variable using command line  k6 run -e BASE_URL= http://restapi.adequateshop.com filename.js 
Project specific execution - 
Pass vus and duration from coomand line - k6 run script.js --vus 1 --duration 10s --iterations/--i 20
Skip http secure connection k6 run script.js --insecure-skip-tls-verify
summary export in json 'k6 run script.js --summary-export==summary.json'
Detailed report export  in json 'k6 run script.js --out json=full_results.json'
echo $?
with minimum logs in jenkins 'k6 run script.js --quiet'
run on grafana cloud using jenkins. token can be taken from grafana stack api token. ' k6 cloud script.js --token SADSADASDASA 
export K6_CLOUD_PROJECT_ID = 212321


```