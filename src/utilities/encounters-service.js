import sendRequest from './send-request';

const BASE_URL = '/api/encounters';

export async function fetchEncounters() {
  return sendRequest(BASE_URL, 'GET');
}

export async function createEncounter(encounterData) {
  return sendRequest(BASE_URL, 'POST', encounterData);
}

export async function updateEncounter(encounterId, updatedData) {
  return sendRequest(`${BASE_URL}/${encounterId}`, 'PUT', updatedData);
}

export async function deleteEncounter(encounterId) {
  return sendRequest(`${BASE_URL}/${encounterId}`, 'DELETE');
}