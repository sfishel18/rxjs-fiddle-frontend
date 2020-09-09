import { Api } from '../api';

const mockApi: Api = {
  fetchFiddleOutput: () => Promise.resolve([]),
};

export default mockApi;
