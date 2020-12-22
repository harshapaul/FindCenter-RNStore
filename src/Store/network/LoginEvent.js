import React from 'react';
import RestApiClient from '../network/RestApiClient';

export default class LoginEvent {
  doLogin = (username, password) => {
    var restApiClient = new RestApiClient();
    console.log({
      username: username,
      password: password,
    });
    return restApiClient
      .login({
        username: username,
        password: password,
      })
      .then(response => response);
  };
}
