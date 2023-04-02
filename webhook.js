'use strict';

const {google} = require('googleapis');
const {WebhookClient} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = (request, response) => {
    const agent = new WebhookClient({ request, response });

    async function getSheetData(symptom, severity, duration) {
        // authentication and authorization with Google Sheets API
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });
        const authClient = await auth.getClient();
        google.options({ auth: authClient });

        // define the spreadsheet and sheet name
        const spreadsheetId = '1_sHoVRjunIHIDwVDk9U1Dd6OUMrTJb0svxUKjdasnoE';
        const range = 'Sheet1!A2:D';

        // retrieve the data from the sheet
        const sheets = google.sheets({version: 'v4'});
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        // filter the data based on the three entity values
        const rows = response.data.values.filter(row => row[0] === symptom && row[1] === severity && row[2] === duration);

        // return the output value from the sheet
        if (rows.length > 0) {
            return rows[0][3];
        } else {
            return 'No matching data found in the sheet.';
        }
    }

    async function handleSymptoms(agent) {
        const symptom = agent.parameters['symptoms'];
        const severity = agent.parameters['severity'];
        const duration = agent.parameters['duration'];
        const output = await getSheetData(symptom, severity, duration);
        agent.add(output);
    }

    let intentMap = new Map();
    intentMap.set('handle_symptoms_intent', handleSymptoms);
    agent.handleRequest(intentMap);
};
