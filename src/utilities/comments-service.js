import sendRequest from './send-request';

const BASE_URL = '/api/comments';

export async function fetchCommentsForEncounter(encounterId) {
  return sendRequest(`${BASE_URL}/${encounterId}`, 'GET');
}

export async function createComment(commentData) {
  return sendRequest(BASE_URL, 'POST', commentData);
}