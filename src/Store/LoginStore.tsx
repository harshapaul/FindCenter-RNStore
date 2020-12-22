import { Login } from "../../../src/models/Login";
import { types } from "mobx-state-tree";

const LoginStore = Login.create({username: "",
                                password: "",
                                loggedin:false})
