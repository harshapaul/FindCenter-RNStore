import { types } from "mobx-state-tree";

//signup payload
export const signupPayload = {
  firstName: "Prasad",
  lastName: "Desai",
  email: "prasad5551@adeata.com",
  username: "prasad5551",
  password: "mail_123",
}

export const activatePayload = {
  usernameOrEmail: "prasad5551@adeata.com",
  activationCode: "FdqmrY"
}

//login payload
export const loginPayload = {
  usernameOrEmail: "",
  password: "",
}

export const editProfilePayload = {
  id: "",
  firstName: "Prasad",
  lastName: "PAndey",
  email: "prasad5551@adeata.com",
  username: "prasad5551",
  password: "mail_1234",
  roleId: 4,
  active: true,

}

export const resetPasswordPayload = {
  password: "mail_1234",
  usernameOrEmail: "tejas8881@fw025.com",
  token: 604924

}


//change password payload
export const changePasswordPayload = {
  oldPassword: "mail_123",
  newPassword: "mail_1234",
}

//regenrate activation code payload
export const activationCodePayload = {
  usernameOrEmail: "tejas88881@adeata.com",

  //  newPassword : "mail_1234",
}

//regenrate activation code payload
export const forgotPassword = {
  usernameOrEmail: "tejas5551@adeata.com",


}

//headers model for sending cookie with url for showing profile pic in image view
const headersModel = types.model({
  Cookie: types.optional(types.string, ""),
})

//additional model for profile pic display in image view. Use as is in image view.
const profilePicURLModel = types.model({
  uri: types.optional(types.string, ""),
  headers: types.optional(headersModel, { Cookie: '' }),
})


/**
 * the structure of logged in user as received from server + additional properies for
 * maintaining some states
 */
export const UserProps = {

  user: types.maybeNull(types.model({
    id: types.number,
    firstName: types.string,
    lastName: types.string,
    email: types.string,
    username: types.string,
    roleId: types.number,
    active: types.boolean,
    private: types.boolean,
    lastLogin: types.string,
    createdAt: types.string,
    profileImageName: types.optional(types.string, ""),
    aboutMe: types.optional(types.string, ""),

    profilePicURLwithHeaders: types.optional(
      profilePicURLModel, {}
    ),

    role: types.model({
      id: types.number,
      name: types.string
    })
  })),
  Cookie: types.optional(types.string, ""),
  token: types.optional(types.string, ""),
  status: types.optional(types.number, 0),
  message: types.maybe(types.string),
  loggedIn: types.maybe(types.boolean),
}