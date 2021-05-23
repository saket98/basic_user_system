import Axios from "axios";
import Cookie from "js-cookie";
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL } from "../Constants/userConstants";

const userList = () => async (dispatch) => {
	try {
		dispatch({ type: USER_LIST_REQUEST });
		const user = await Axios.get("/user");
		dispatch({ type: USER_LIST_SUCCESS, payload: user });
	} catch (error) {
		dispatch({ type: USER_LIST_FAIL, payload: error.message });
	}
};

const deleteUser = (userId) => async (dispatch) => {
	dispatch({ type: USER_DELETE_REQUEST, payload: userId });
	try {
		const { data } = await Axios.delete("/user/" + userId);
		dispatch({ type: USER_DELETE_SUCCESS, payload: data });
		} catch (error) {
		dispatch({ type: USER_DELETE_FAIL, payload: error.message });
	}
};

const signin = (email, password) => async (dispatch) => {
	dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

	await Axios.post("/user/login", { email, password })
		.then((res) => {
			console.log(res.data);
			dispatch({ type: USER_SIGNIN_SUCCESS, payload: res.data });
			Cookie.set("userInfo", JSON.stringify(res.data));
		})
		.catch((err) => {
			dispatch({ type: USER_SIGNIN_FAIL, payload: err.message });
		});
};

const register = (name, email, password, password2, phone, role) => async (dispatch) => {
	dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password, password2, phone, role } });
	try {
		const { data } = await Axios.post("/user/register", { name, email, password, password2, phone, role });
		console.log(data);
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		Cookie.set("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
	}
};

const logout = () => (dispatch) => {
	Cookie.remove("userInfo");
	dispatch({ type: USER_LOGOUT });
};

export { signin, register, logout, deleteUser, userList };
