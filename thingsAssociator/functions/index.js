/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const endpointString = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY";

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest(async (request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  try {
    await getNASAData(response)
      .then(jsonData => {
      response.status(200).send(jsonData);
    })
  } catch (error) {
    response.status(500).send(error.json);
  }
});

async function getNASAData() {
  try {
    let res;
    res = await fetch(endpointString);
    return await res.json();
  } catch (error) {
    throw error
  }
}