import cookie from 'js-cookie';
import { ajax } from 'rxjs/ajax';
import { pluck } from 'rxjs/operators';
import { Services } from './types';

const API_URL = cookie.get('API_URL');

const apiAjax = ajaxObj =>
  ajax({
    headers: {
      'Content-Type': 'application/json',
    },
    ...ajaxObj,
    url: `${API_URL}/${ajaxObj.url}`,
  });

const fetchFiddleOutput = source =>
  apiAjax({
    body: { source },
    method: 'POST',
    url: 'run-fiddle',
  }).pipe(pluck('response', 'response'));

const services: Services = { fetchFiddleOutput };

export default services;
