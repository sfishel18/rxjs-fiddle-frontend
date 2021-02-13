import React from 'react';
import ReactDom from 'react-dom';
import { RecoilRoot } from 'recoil';
import api from './api';
import App from './components/App';
import ApiStore from './stores/ApiStore';

// tslint:disable-next-line: no-any
(ReactDom as any).unstable_createRoot(document.getElementById('app')).render(
  <RecoilRoot>
    <ApiStore api={api}>
      <App />
    </ApiStore>
  </RecoilRoot>,
);
