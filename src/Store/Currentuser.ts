import { activateAction, activationCodeAction, changePasswordAction, editProfileAction, forgotPasswordAction, generateUsernameAction, loginAction, logoutAction, photoAction, registerAction, resetPasswordAction } from './actions/LoginAPIactions';
import { flow, types } from 'mobx-state-tree';

import { UserProps } from './Model/LoginProps';

const CurrentUser = types
  .model('CurrentUser', UserProps)
  //.props(loginProps)
  .actions(registerAction)
  .actions(activateAction)
  .actions(loginAction)
  .actions(logoutAction)
  .actions(changePasswordAction)
  .actions(activationCodeAction)
  .actions(forgotPasswordAction)
  .actions(resetPasswordAction)
  .actions(editProfileAction)
  .actions(resetPasswordAction)
  .actions(generateUsernameAction)
  .actions(photoAction)



export default CurrentUser;