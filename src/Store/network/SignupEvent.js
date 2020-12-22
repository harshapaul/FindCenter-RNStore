import RestApiClient from './RestApiClient';

export default class SignupEvent {
  doSignup = (data) => {
    console.log(
      'SignupEvent :: doSignup' +
        'signupRequestBody => ' +
        JSON.stringify(data),
    );

    var restApiClient = new RestApiClient();
    return restApiClient.doSignUp(data).then((response) => response);
  };
}
