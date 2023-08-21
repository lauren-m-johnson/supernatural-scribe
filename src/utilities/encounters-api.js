import sendRequest from './send-request';

const BASE_URL = '/api/encounters';

export async function fetchEncountersApi() {
  return sendRequest(BASE_URL, 'GET');
}