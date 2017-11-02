import axios from 'axios'
import { browserHistory } from 'react-router';
import * as constant from '../../../config/config'
import { updateAppState } from '../containers/AppReducer'
import { showLoading, hideLoading } from '../components/Loading/LoadingReducer'

let isAbsoluteURLRegex = /^(?:\w+:)\/\//;

const createAxiosInterceptor = ((store) => {
  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    store.dispatch(showLoading());
    // Do something before request is sent
    const {app} = store.getState();
    if (app && app.acceptToken) {
      config.headers['Authorization'] = 'Bearer ' + app.acceptToken;
    }
    // Concatenate base path if not an absolute URL
    if ( !isAbsoluteURLRegex.test(config.url) ) {
      config.url = constant.domain + config.url;
    }
    return config;
  }, function (error) {
    store.dispatch(hideLoading());
    // Do something with request error
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    store.dispatch(hideLoading());
    return response;
  }, function (error) {
    if (error.response.status === 401) {

      store.dispatch(updateAppState());
      browserHistory.push('/signin');

    }
    store.dispatch(hideLoading());
    return Promise.reject(error);
  });
});

export default createAxiosInterceptor;

