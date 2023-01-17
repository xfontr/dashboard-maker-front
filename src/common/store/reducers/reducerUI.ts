// import { UIState } from "../../types/interfaces";
// import { Action } from "../types/actions";

// const uiReducer = (previousUI: UIState, action: Action): UIState => {
//   let newUI: UIState;

//   switch (action.type) {
//     case "showLoading":
//       newUI = { ...previousUI, isVisible: !previousUI.isVisible };
//       break;

//     case "showSuccess":
//       newUI = { ...previousUI, type: "success" };
//       break;

//     case "showError":
//       newUI = { ...previousUI, type: "error" };
//       break;

//     default:
//       newUI = { ...previousUI };
//   }
//   return newUI;
// };

// export default uiReducer;
