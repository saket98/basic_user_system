import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL } from "../Constants/userConstants";

function userSigninReducer(state = {}, action) {
	switch (action.type) {
		case USER_SIGNIN_REQUEST:
			return { loading: true };
		case USER_SIGNIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_SIGNIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
}

function userDeleteReducer(state = {}, action) {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			console.log(state)
			return { loading: true };
		case USER_DELETE_SUCCESS:
			console.log(action.payload)
			return { loading: false, userInfo: action.payload };
		case USER_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

function userRegisterReducer(state = {}, action) {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

function userListReducer(state = { userData: [] }, action) {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return { loading: true, userData: [] };
		case USER_LIST_SUCCESS:
			return { loading: false, userData: action.payload };
		case USER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

export { userSigninReducer, userRegisterReducer, userDeleteReducer, userListReducer };
