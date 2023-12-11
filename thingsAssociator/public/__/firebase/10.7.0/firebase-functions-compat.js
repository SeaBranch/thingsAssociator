// require("node-fetch");
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const endpointString = "http://localhost:5001/thingsassociator/us-central1/helloWorld"//https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY";

function onTapHelloWorld() {
    console.log("hi");
    try {
        sayHellowWorld().then(result => {
            for (const section in result) {
                console.log(section.toString());
                const neos = result[section]
                for (const neo in neos) {
                    console.log(neos[neo]['name']);
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function sayHellowWorld() {
    try {
        return await getNASAData();
    } catch (error) {
        const message = "Oops Nathan!" + error;
        console.log(message)
    }
}

async function getNASAData() {
    try {
        const res = await fetch(endpointString);
        const data = await res.json();
        return await data['near_earth_objects'];
    } catch (error) {
        throw error;
    }
}