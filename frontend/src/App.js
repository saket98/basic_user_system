import "./App.css";
import { Route } from "react-router-dom";

import RegisterUser from "./components/RegisterUser";
import UserManagment from "./components/UserManagment";
function App() {
	return (
		<div className="App">
			<RegisterUser></RegisterUser>
			<UserManagment></UserManagment>
			<main>
				<Route path="/register" component={RegisterUser}></Route>
				<Route path="/dashbord" component={UserManagment}></Route>
			</main>
		</div>
	);
}

export default App;
