import { observable, action } from "mobx";
    //import { Facebook } from 'expo';
    //import {AsyncStorage} from "react-native"
   
    export default class LoginStore {

      
      @observable username = "";
      @observable email = "";
      @observable password = "";
      @observable emailValidation=[];
      @observable passwordValidation=[];
      @observable emailError = "";
      @observable passwordError = "";
      @observable usernameError = "";
//      @observable emailOnValidate



    @action
      usernameOnChange(id:string) {
        console.log("Myuser NAme", id)
        this.username = id;
//        this.validateEmail();
      }

      @action
      validateEmail() {

      }
    

      @action
      emailOnValidate(isValid:any) {
      //  console.log("My EmailValid", isValid)
        this.emailValidation=isValid ;
        console.log("My EmailValid", this.emailValidation)
        //this.validateUsername();
      }

      @action
      passwordOnValidate(isValid:any) {
        console.log("My PAssword vAlid", isValid)

        this.passwordValidation=isValid ;
        //this.validateUsername();
      }


      @action
      passwordOnChange(_password:string) {
        console.log("My PAssword", _password)

        this.password = _password;
        //this.validateUsername();
      }
    }
