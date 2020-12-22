import * as Constants from './APIConstants';

import RestClient from 'react-native-rest-client';

export default class RestApiClient extends RestClient {
  constructor(sessionId) {
    // Initialize with the base URL
    super(Constants.ROOT_URL, {
      headers: {
        // Include as many custom headers as you need
        'x-api-key': '12344',
        sessionId: sessionId,
        'Content-Type': 'application/json',
      },
    });
  }

  doSignUp(body) {
    // Returns a Promise with the response.
    console.log(
      'RestAPiClient :: doSignup' +
        'sddignupRequestBody => ' +
        JSON.stringify(body),
    );

    // return 'success';
    return this.POST('/test', body).then((response) => response);
  }
}
