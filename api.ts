import cookie from 'js-cookie';
import { FiddleOutput } from './types';

const API_URL = cookie.get('API_URL');

const fetchFiddleOutput = (source: string): Promise<FiddleOutput> =>
  fetch(`${API_URL}/run-fiddle`, {
    body: JSON.stringify({ source }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  })
    .then(response => response.json())
    .then(json => json.response);

const api = { fetchFiddleOutput };

export type Api = typeof api;

export default api;
