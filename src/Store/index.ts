//import Loginstore from "./Loginstore"
import CurrentUser from './Currentuser'
//import DealDetailStore from "./DealDetailStore"

const currentUser = CurrentUser.create();



 const store = {
  currentUser,
};

//windo = store;

// export default {
//   loginStore: new Loginstore(),

//  // dealDetailStore: new DealDetailStore()
// }

export default store