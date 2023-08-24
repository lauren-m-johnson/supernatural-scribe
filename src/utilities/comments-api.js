import sendRequest from './send-request';
import { fetchUserData } from './users-api';

const BASE_URL = '/api/comments';

export async function fetchCommentsForEncounter(encounterId) {
  return sendRequest(`${BASE_URL}/encounter/${encounterId}`, 'GET');
}

export async function createComment(commentData) {
  return sendRequest(BASE_URL, 'POST', commentData);
}

export async function deleteComment(commentId) {
  return sendRequest(`${BASE_URL}/${commentId}`, 'DELETE');
}

export async function fetchCommentAuthor(userId) {
  try {
    const user = await fetchUserData(userId);
    return user;
  } catch (error) {
    throw error;
  }
}