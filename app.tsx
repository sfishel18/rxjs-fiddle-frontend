import React from 'react';
import ReactDom from 'react-dom';
import { RecoilRoot } from 'recoil';
import api from './api';
import AppContainer from './containers/AppContainer';
import AtomsStore from './stores/atoms-store';

// tslint:disable-next-line: no-any
(ReactDom as any).unstable_createRoot(document.getElementById('app')).render(
  <RecoilRoot>
    <AtomsStore api={api}>
      <AppContainer />
    </AtomsStore>
  </RecoilRoot>,
);
