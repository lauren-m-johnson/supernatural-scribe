import sendRequest from './send-request';

const BASE_URL = '/api/encounters';

export async function createEncounter(encounterData) {
  return sendRequest(BASE_URL, 'POST', encounterData);
}

export async function fetchEncounters() {
  return sendRequest(BASE_URL, 'GET');
}