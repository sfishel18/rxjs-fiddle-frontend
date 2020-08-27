import cookie from 'js-cookie';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BatchRecorder, jsonEncoder } from 'zipkin';
import Tracer from 'zipkin-javascript-opentracing';
import { HttpLogger } from 'zipkin-transport-http';
import AppContainer from './redux/containers/AppContainer';
import createStore from './redux/create-store';
import services from './redux/services';

const tracer = new Tracer({
  kind: 'client',
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      endpoint: `${cookie.get('API_URL')}/v1/trace`,
      jsonEncoder: jsonEncoder.JSON_V2,
    }),
  }),
  serviceName: 'frontend',
});

const span = tracer.startSpan('aha');

setTimeout(() => span.finish(), 5000);

const store = createStore(undefined, services);

// tslint:disable-next-line: no-any
(ReactDom as any).unstable_createRoot(document.getElementById('app')).render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
);
