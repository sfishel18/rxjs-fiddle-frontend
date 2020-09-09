import cookie from 'js-cookie';
import React from 'react';
import ReactDom from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BatchRecorder, jsonEncoder } from 'zipkin';
import Tracer from 'zipkin-javascript-opentracing';
import { HttpLogger } from 'zipkin-transport-http';
import api from './api';
import AppContainer from './containers/AppContainer';
import AtomsStore from './stores/atoms-store';

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

// tslint:disable-next-line: no-any
(ReactDom as any).unstable_createRoot(document.getElementById('app')).render(
  <RecoilRoot>
    <AtomsStore api={api}>
      <AppContainer />
    </AtomsStore>
  </RecoilRoot>,
);
