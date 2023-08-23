import sendRequest from './send-request';

const BASE_URL = '/api/encounters';

export async function fetchEncountersApi() {
  return sendRequest(BASE_URL, 'GET');
}

export async function createEncounterApi(encounterData) {
  return sendRequest(BASE_URL, 'POST', encounterData);
}

export function updateEncounterApi(encounterId, updatedData) {
  return sendRequest(`${BASE_URL}/${encounterId}`, 'PUT', updatedData);
}

export function deleteEncounter(encounterId) {
  return sendRequest(`${BASE_URL}/${encounterId}`, 'DELETE');
}