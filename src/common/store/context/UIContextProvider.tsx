// import { useReducer } from "react";
// import uiReducer from "../reducers/reducerUI";
// import UIContext from "./UIContext";

// interface UIContextProviderProps {
//   children: JSX.Element | JSX.Element[];
// }

// const UIContextProvider = ({
//   children,
// }: UIContextProviderProps): JSX.Element => {
//   const initialUI: UIState = {
//     isVisible: false,
//     type: "loading",
//   };
//   const [ui, dispatch] = useReducer(uiReducer, initialUI);
//   return (
//     <UIContext.Provider value={{ ui, dispatch }}>{children}</UIContext.Provider>
//   );
// };

// export default UIContextProvider;
