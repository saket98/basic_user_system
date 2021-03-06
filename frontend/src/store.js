import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import Cookie from "js-cookie";
import thunk from "redux-thunk";
import { userSigninReducer, userRegisterReducer, userDeleteReducer, userListReducer } from "./Reducer/userReducers";

const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = {
	userSignin: { userInfo },
};

const reducer = combineReducers({
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
	userDelete: userDeleteReducer,
	userList: userListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
