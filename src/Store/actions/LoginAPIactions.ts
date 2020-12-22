import * as AxiosLogger from 'axios-logger';

import { ACTIVATE, ACTIVATE_CODE, BASE_URL, FOGOTPASSWORD, GENERATE_USER, LOGIN, PROFILEPIC, PWD, RESETPASSWORD, RESETPASSWORD2, UPLOADIMAGE, USERID, USERS } from '../network/contants';
import { APIKit, apiConfig, } from '../network/ApiKit';
import { IapiConfig, ImageAPIKit } from '../network/ImageAPIKit';
import { activatePayload, activationCodePayload, changePasswordPayload, forgotPassword, loginPayload, loginUserProps, resetPasswordPayload, signupPayload, uploadImagePayload } from '../Model/LoginProps';
import { flow, types } from 'mobx-state-tree';

import { Platform } from 'react-native';
import { startNetworkLogging } from 'react-native-network-logger';

//import ImgToBase64 from 'react-native-image-base64';
//import * as RNFS from 'react-native-fs';
//const imageToBase64 = require('image-to-base64');
//import ImgToBase64 from 'react-native-image-base64';
//import {image} from '../image/'

//const RNFS = require("react-native-fs");


/**
 * register API call
 * API documentation:
 * https://dev.findcenter.com/doc/#docs/method/#667
 */
export const registerAction = (self) => ({
  register: flow(function* (signupPayload: any) {
    try {

      // APIKit.interceptors.request.use(request => {
      //   console.log('Starting Request', JSON.stringify(request, null, 2))
      //   return request
      // })

      const res = yield APIKit.post(`${USERS}`, signupPayload);

      console.log('signup axios ' + JSON.stringify(res));

      if (res.status == 200) {
        console.log('registered actions');
        self.user = res.data;
        self.status = res.status;
        console.log('user ' + JSON.stringify(self.user));
      }
    } catch (error) {
      if (error.response) {
        self.status = error.response.status;
        self.message = error.response.data[0].message;
        console.log('response error', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('request error', error.request);
        self.status = error.request.status;
      } else {
        // Something happened in setting up the request that triggered an Error
        self.status = 101;
        console.log('Error', error.message);
      }

      console.log('self.message ' + JSON.stringify(self.message));
      console.log('self.status ' + self.status);
    }
  },
  ),

});


/**
 * login API call
 * API documentation:
 * https://dev.findcenter.com/doc/#docs/method/#337
 */
export const loginAction = (self) => ({
  login: flow(function* (loginPayload: any) {
    try {

      APIKit.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2))
        return request
      })
      const res = yield APIKit.post(`${LOGIN}`, loginPayload, apiConfig);

      console.log('outside axios ' + JSON.stringify(res));

      if (res.status == 200) {
        self.user = res.data.user;
        self.Cookie = res['headers']['set-cookie'][0];
        self.token = res.data.token;
        self.status = res.status;
        if (res.data.user.profileImageName != "") {
          console.log("urlmodel", self.user.profilePicURLwithHeaders);

          self.user.profilePicURLwithHeaders.headers.Cookie = res['headers']['set-cookie'][0];

          self.user.profilePicURLwithHeaders.uri = `${BASE_URL}${USERID}${self.user.id}${PROFILEPIC}${self.user.profileImageName}`;

          console.log("urlmodel loaded", self.user.profilePicURLwithHeaders);
        }
        self.profileImageURL = ``;
        self.loggedIn = true;
        console.log('token ' + JSON.stringify(self.token));
        console.log('user ' + JSON.stringify(self.user));
        //        console.log("cookie",JSON.stringify(res.headers))
        console.log("cookie", JSON.stringify(self.Cookie));
      }
    } catch (error) {
      if (error.response) {
        self.status = error.response.status;
        if (error.response.data.message)
          self.message = error.response.data.message;
        console.log('response error', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('request error', error.request);
        self.status = error.request.status;
      } else {
        // Something happened in setting up the request that triggered an Error
        self.status = 101;
        console.log('Error', error.message);
      }

      console.log('self.message ' + JSON.stringify(self.message));
      console.log('self.status ' + self.status);
    }
  },
  ),

});

/**
* logout API call
* API documentation:
* https://dev.findcenter.com/doc/#docs/method/#376
*/
export const logoutAction = (self) =>
  ({
    logout: flow(function* () {
      try {
        const res = yield APIKit.delete(`${LOGIN}`, apiConfig);

        console.log('logout ' + JSON.stringify(res));

        if (res.status == 200) {
          self.user = null;
          self.token = "";
          self.loggedIn = false;
          self.status = res.status;
          self.message = res.data;
          self.Cookie = "";
        }
      } catch (error) {
        if (error.response) {
          self.status = error.response.status;
          self.message = error.response.data.message;
          console.log('response error', error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('request error', error.request);
          self.status = error.request.status;
        } else {
          // Something happened in setting up the request that triggered an Error
          self.status = 101;
          console.log('Error', error.message);
        }
        console.log('self.message ' + JSON.stringify(self.message));
        console.log('self.status ' + self.status);

      }
    }
    ),

  });

/**
 * change password API call
 * API documentation:
 * https://dev.findcenter.com/doc/#docs/method/#777
 */
export const changePasswordAction = (self) => ({
  changePassword: flow(function* (changePasswordPayload: any) {
    try {
      //        const res = yield APIKit.post(`${self.user}/${LOGIN}`, loginPayload, apiConfig );

      console.log('user' + JSON.stringify(self.user.username));

      APIKit.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2))
        return request
      })

      const res = yield APIKit.put(`${USERS}/${self.user.id}${PWD}`,
        changePasswordPayload, { withCredentials: true });

      console.log('change password' + JSON.stringify(res.data));

      if (res.status == 200) {
        self.status = res.status;
        console.log('password changed');
      }
    } catch (error) {
      if (error.response) {
        self.status = error.response.status;
        self.message = error.response.data.message;
        console.log('response error', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('request error', error.request);
        self.status = error.request.status;
      } else {
        // Something happened in setting up the request that triggered an Error
        self.status = 101;
        console.log('Error', error.message);
      }

      console.log('self.data ' + JSON.stringify(error.response));
      console.log('self.message ' + JSON.stringify(error.response.data.message));
      console.log('self.status ' + error.response.status);
    }
  },
  ),

});

/**
* activate user with otp on signup API call
* API documentation:
* https://dev.findcenter.com/doc/#docs/method/#1059
*/
export const activateAction = (self) => ({
  activate: flow(function* (activatePayload: any) {
    try {
      //        const res = yield APIKit.post(`${self.user}/${LOGIN}`, loginPayload, apiConfig );
      console.log("Payload", activatePayload)
      //console.log('user' + JSON.stringify(self.user.username));

      // APIKit.interceptors.request.use(request => {
      //   console.log('Starting Request', JSON.stringify(request, null, 2))
      //   return request
      // })

      const res = yield APIKit.put(`${USERS}${ACTIVATE}`,
        activatePayload, { withCredentials: true });

      console.log('activate' + JSON.stringify(res.data));

      if (res.status == 200) {
        self.status = res.status;
        console.log('activated');
      }
    } catch (error) {
      if (error.response) {
        self.status = error.response.status;
        self.message = error.response.data.message;
        console.log('response error', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('request error', error.request);
        self.status = error.request.status;
      } else {
        // Something happened in setting up the request that triggered an Error
        self.status = 101;
        console.log('Error', error.message);
      }


      console.log('self.data ' + JSON.stringify(error.response));
      console.log('self.message ' + JSON.stringify(error.response.data.message));
      console.log('self.status ' + error.response.status);
    }
  },
  ),

});

/**
* Regenrate activate code for signin after signup API call
* API documentation:
* https://dev.findcenter.com/doc/#docs/method/#1038
*/

export const activationCodeAction = (self) => ({
  activateCode: flow(function* (activationCodePayload: any) {
    try {
      //        const res = yield APIKit.post(`${self.user}/${LOGIN}`, loginPayload, apiConfig );

      //  console.log('user' + JSON.stringify(self.user.username));

      // APIKit.interceptors.request.use(request => {
      //   console.log('Starting Request', JSON.stringify(request, null, 2))
      //   return request
      // })

      const res = yield APIKit.put(`${USERS}${ACTIVATE_CODE}`,
        activationCodePayload, { withCredentials: true });

      console.log('activate' + JSON.stringify(res.data));

      if (res.status == 200) {
        self.status = res.status;
        console.log('Activation code generated');
      }
    } catch (error) {
      if (error.response) {
        self.status = error.response.status;
        if (error.response.data.message)
          self.message = error.response.data.message;
        else
          self.message = error.response.data;
        console.log('response error', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('request error', error.request);
        self.status = error.request.status;
      } else {
        // Something happened in setting up the request that triggered an Error
        self.status = 101;
        console.log('Error', error.message);
      }


      console.log('self.data ' + JSON.stringify(error.response));
      console.log('self.message ' + JSON.stringify(self.message));
      console.log('self.status ' + self.status);
    }
  },
  ),

});

/**
 * Send otp to mail id for resetting password API call
 * API documentation:
 * https://dev.findcenter.com/doc/#docs/method/#798
 */

export const forgotPasswordAction = (self) => ({
  forgotpassword: flow(function* (forgotPassword: any) {
    try {
      //        const res = yield APIKit.post(`${self.user}/${LOGIN}`, loginPayload, apiConfig );

      //  console.log('user' + JSON.stringify(self.user.username));

      APIKit.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2))
        return request
      })
      console.log(forgotPassword);

      const res = yield APIKit.post(`${USERS}${FOGOTPASSWORD}`,
        forgotPassword, { withCredentials: true });

      console.log('forgot password' + JSON.stringify(res.data));

      if (res.status == 200) {
        self.status = res.status;
        console.log('Forgot password generated');
      }
    } catch (error) {
      if (error.response) {
        self.status = error.response.status;
        self.message = error.response.data.message;
        console.log('response error', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('request error', error.request);
        self.status = error.request.status;
      } else {
        // Something happened in setting up the request that triggered an Error
        self.status = 101;
        console.log('Error', error.message);
      }


      console.log('self.data ' + JSON.stringify(error.response));
      console.log('self.message ' + JSON.stringify(error.response.data.message));
      console.log('self.status ' + error.response.status);
    }
  },
  ),

});

/**
 * resetting password with otp and new password API call
 * API documentation:
 * https://dev.findcenter.com/doc/#docs/method/#825
 */
export const resetPasswordAction2 = (self) => ({
  resetPassword2: flow(function* (resetPassword: any) {
    try {
      APIKit.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2))
        return request
      })

      const res = yield APIKit.post(`${USERS}${RESETPASSWORD2}`,
        resetPassword, { withCredentials: true });

      console.log('forgot password' + JSON.stringify(res.data));

      if (res.status == 200) {
        self.status = res.status;
        console.log('password reset successfully');
      }
    } catch (error) {
      if (error.response) {
        self.status = error.response.status;
        self.message = error.response.data.message;
        console.log('response error', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('request error', error.request);
        self.status = error.request.status;
      } else {
        // Something happened in setting up the request that triggered an Error
        self.status = 101;
        console.log('Error', error.message);
      }


      console.log('self.data ' + JSON.stringify(error.response));
      console.log('self.message ' + JSON.stringify(error.response.data.message));
      console.log('self.status ' + error.response.status);
    }
  },
  ),

});

/**
 * Update profile information API call
 * API documentation:
 * https://dev.findcenter.com/doc/#docs/method/#909
 */
export const editProfileAction = (self) => ({
  editProfile: flow(function* (editProfilePayload: any) {
    try {
      //        const res = yield APIKit.post(`${self.user}/${LOGIN}`, loginPayload, apiConfig );

      //  console.log('user' + JSON.stringify(self.user.username));

      // APIKit.interceptors.request.use(request => {
      //   console.log('Starting Request', JSON.stringify(request, null, 2))
      //   return request
      // })
      console.log(editProfilePayload);
      console.log("My ID", editProfilePayload.id);
      const res = yield APIKit.put(`${USERID}${self.user.id}`,
        editProfilePayload, { withCredentials: true });

      console.log('Edit profile' + JSON.stringify(res.data));

      if (res.status == 200) {
        self.status = res.status;
        console.log('Edit profile generated');

        self.user = res.data;

        console.log("My self user", JSON.stringify(self.user))

        //self.token = res.data.token;
      }
    } catch (error) {
      if (error.response) {
        self.status = error.response.status;
        self.message = error.response.data.message;
        console.log('response error', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('request error', error.request);
        self.status = error.request.status;
      } else {
        // Something happened in setting up the request that triggered an Error
        self.status = 101;
        console.log('Error', error.message);
      }


      console.log('self.data ' + JSON.stringify(error.response));
      console.log('self.message ' + JSON.stringify(error.response.data.message));
      console.log('self.status ' + error.response.status);
    }
  },
  ),

});


export const resetPasswordAction = (self) => ({
  resetPassword: flow(function* (resetPasswordPayload: any) {
    try {
      //        const res = yield APIKit.post(`${self.user}/${LOGIN}`, loginPayload, apiConfig );

      //  console.log('user' + JSON.stringify(self.user.username));

      // APIKit.interceptors.request.use(request => {
      //   console.log('Starting Request', JSON.stringify(request, null, 2))
      //   return request
      // })
      console.log(resetPasswordPayload);
      //  console.log("My ID",editProfilePayload.id);
      const res = yield APIKit.post(`${RESETPASSWORD}`,
        resetPasswordPayload, { withCredentials: true });

      console.log('Edit profile' + JSON.stringify(res.data));

      if (res.status == 200) {
        console.log('reset  generated');

        // self.user = res.data;

        console.log("My self user", JSON.stringify(res))

        //self.token = res.data.token;
      }
    } catch (error) {
      if (error.response) {
        self.errorCode = error.response.status;
        self.errorMessage = error.response.data.message;
        console.log('response error', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('request error', error.request);
        self.errorCode = error.request.status;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }


      console.log('self.data ' + JSON.stringify(error.response));
      console.log('self.errorMessage ' + JSON.stringify(error.response.data.message));
      console.log('self.errorCode ' + error.response.status);
    }
  },
  ),

});

export const uploadImageAction = (self) => ({
  uploadImage: flow(function* (data: any) {
    try {
      //        const res = yield APIKit.post(`${self.user}/${LOGIN}`, loginPayload, apiConfig );

      //  console.log('user' + JSON.stringify(self.user.username));

      // APIKit.interceptors.request.use(request => {
      //   console.log('Starting Request', JSON.stringify(request, null, 2))
      //   return request
      // })
      console.log("upload image", data);

      // var data = new FormData();
      // data.append('image',
      // {
      //   uri:image,
      //   name:'avtar.jpg',
      //   type:'image/jpg'
      // // });


      // response.uri from react-native-camera
      //const Path = `${RNFS.DocumentDirectoryPath}/movie_banner.jpg`;
      //const Path = "" 
      //const imagePath = require('../../../assets/profile/profile.png');
      //This PC\Galaxy A50\Phone\Android\data\com.findcenter\files
      //self.user.id=101
      //console.log(self.user.id)


      //console.log("My ID",uploadImagePayload.id);
      //  const res = yield APIKit.put(`${USERS}/${self.user.id}${PWD}`,


      const res = yield ImageAPIKit.post(`${USERID}${'26'}${UPLOADIMAGE}`,
        data, { withCredentials: true });

      console.log('Upload Image' + JSON.stringify(res.data));

      if (res.status == 200) {
        console.log('reset  generated');

        // self.user = res.data;

        console.log("My self user", JSON.stringify(res))

        //self.token = res.data.token;
      }
    } catch (error) {
      if (error.response) {
        self.errorCode = error.response.status;
        self.errorMessage = error.response.data.message;
        console.log('response error', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('request error', error.request);
        self.errorCode = error.request.status;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }


      console.log('self.data ' + JSON.stringify(error.response));
      console.log('self.errorMessage ' + JSON.stringify(error.response.data.message));
      console.log('self.errorCode ' + error.response.status);
    }
  },
  ),

});

export const photoAction = (self) => ({
  uploadPhoto: flow(function* (photo: any) {
    console.log("uploadPhoto:flow -> photo", photo);
    try {


      var uri = Platform.OS === "android" ? photo.path : photo.sourceURL.replace("file://", "")

      const data = new FormData();
      data.append('newProfilePicture', {
        uri: Platform.OS === "android" ? photo.path : photo.sourceURL.replace("file://", ""),
        //        uri: "file:///storage/emulated/0/test.jpg",
        name: self.user.id.toString(),
        type: photo.mime,
        // size: picSize, 
        // slice: () => new Blob(),
      });

      console.log("upload photo", data);

      APIKit.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2))
        return request
      })

      console.log('before Image upload');
      const res = yield APIKit.post(`${USERS}/${self.user.id}${UPLOADIMAGE}`,
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Upload Image' + JSON.stringify(res.data));

      if (res.status == 200) {
        self.status = res.status;
        console.log('image uploaded');
      }
    } catch (error) {
      if (error.response) {
        self.status = error.response.status;
        self.message = error.response.data.message;
        console.log('response error', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('request error', error.request);
        self.status = error.request.status;
      } else {
        // Something happened in setting up the request that triggered an Error
        self.status = 101;
        console.log('Error', error.message);
      }
    }
  },
  ),

});

export const generateUsernameAction = (self) => ({
  generateUsername: flow(function* (generateUsernamePayload: any) {
    try {
      APIKit.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2))
        return request
      })
      console.log(generateUsernamePayload);

      const res = yield APIKit.post(`${GENERATE_USER}`,
        generateUsernamePayload, { withCredentials: true });

      console.log('generate username' + JSON.stringify(res.data));

      if (res.status == 200) {
        console.log('user  generated');
        self.usernameAvailable = res.data.usernameAvailable;
        self.suggestion = res.data.suggestion;
        self.status = res.status;

        // self.user = res.data;

        console.log("generate user res", JSON.stringify(res))

        //self.token = res.data.token;
      }
    } catch (error) {
      if (error.response) {
        self.status = error.response.status;
        self.message = error.response.data[0].message;
        console.log('response error', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('request error', error.request);
        self.status = error.request.status;
      } else {
        // Something happened in setting up the request that triggered an Error
        self.status = 101;
        console.log('Error', error.message);
      }

      console.log('self.message ' + JSON.stringify(self.message));
      console.log('self.status ' + self.status);

    }
  },
  ),

});
