// require("node-fetch");
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const endpointString = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY";

function onTapHelloWorld() {
    console.log("hi");
    sayHellowWorld();
}

function sayHellowWorld() {
    try {
        getNASAData()
            .then(dataString => { dataString
                const message = "Hello from Firebase Nathan!" + dataString;
                console.log(message)
            })
    } catch (error) {
        const message = "Opps Nathan!" + error;
        console.log(message)
    }
}

async function getNASAData() {
    try {
        const res = await fetch(endpointString);
        const data = await res.json();
        return JSON.stringify(data);
    } catch (error) {
        throw error
    }
}