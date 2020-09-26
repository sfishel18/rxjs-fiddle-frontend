import cookie from 'js-cookie';
import { BatchRecorder, jsonEncoder } from 'zipkin';
import Tracer, { FORMAT_HTTP_HEADERS } from 'zipkin-javascript-opentracing';
import { HttpLogger } from 'zipkin-transport-http';
import { FiddleOutput } from './types';

const API_URL = cookie.get('API_URL');

const tracer = new Tracer({
  kind: 'client',
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      endpoint: `${API_URL}/v2/trace`,
      jsonEncoder: jsonEncoder.JSON_V2,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  }),
  serviceName: 'frontend',
});

const fetchFiddleOutput = (source: string): Promise<FiddleOutput> => {
  const span = tracer.startSpan('fetchFiddleOutput');
  span.setTag('environment', 'sfishel');
  const headers = {
    'Content-Type': 'application/json',
  };
  tracer.inject(span, FORMAT_HTTP_HEADERS, headers);
  return fetch(`${API_URL}/run-fiddle`, {
    body: JSON.stringify({ source }),
    headers,
    method: 'POST',
  })
    .then(response => response.json())
    .then(json => {
      span.finish();
      return json.response;
    });
};

const api = { fetchFiddleOutput };

export type Api = typeof api;

export default api;
