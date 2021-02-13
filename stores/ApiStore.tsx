import React, { createContext, useContext } from 'react';
import { Api } from '../api';

const ApiStoreContext = createContext<Api>((null as unknown) as Api);

const ApiStore: React.FC<{ api: Api }> = props => (
  <ApiStoreContext.Provider value={props.api}>{props.children}</ApiStoreContext.Provider>
);

export default ApiStore;

export const useApi = () => useContext(ApiStoreContext);
