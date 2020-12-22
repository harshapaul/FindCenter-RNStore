import { types } from "mobx-state-tree";
import { Login } from "../models/Login";

const LoginStore = Login.create({username: "",
                                password: "",
                                loggedin:false})
