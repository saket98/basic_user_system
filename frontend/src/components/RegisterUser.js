import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../Action/userAction";

function RegisterScreen(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [role, setRole] = useState("");
	const [phone, setPhone] = useState("");
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		console.log("inside handler");
		e.preventDefault();
		dispatch(register(name, email, password, rePassword, role, phone));
	};

	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li className="active">
						<a style={{ paddingTop: "4px", paddingBottom: "4px" }} href="#new" role="tab" data-toggle="tab" className="big">
							New User
						</a>
					</li>
					<li>
						<a style={{ paddingTop: "4px", paddingBottom: "4px" }} href="#user" role="tab" data-toggle="tab" className="big">
							I have account
						</a>
					</li>

					<li>
						<div className="form-group">
							<div className="right-inner-addon">
								<i className="glyphicon glyphicon-envelope" />
								<input className="form-control input-lg" placeholder="Name" type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
							</div>
						</div>
					</li>
					<li>
						<div className="form-group">
							<div className="right-inner-addon">
								<i className="glyphicon glyphicon-envelope" />
								<input className="form-control input-lg" placeholder="Enter Email ID" type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
							</div>
						</div>
					</li>
					<li>
						<div className="form-group">
							<div className="right-inner-addon">
								<i className="glyphicon glyphicon-lock" />
								<input className="form-control input-lg" placeholder="Password" type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
							</div>
						</div>
					</li>
					<li>
						<div className="form-group">
							<div className="right-inner-addon">
								<i className="glyphicon glyphicon-lock" />
								<input className="form-control input-lg" placeholder="Confirm Password" type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)} />
							</div>
						</div>
					</li>
					<li>
						<div className="form-group">
							<div className="right-inner-addon">
								<i className="glyphicon glyphicon-phone" />
								<input className="form-control input-lg" placeholder="Enter Phone Number " name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} type="text" />
							</div>
						</div>
					</li>
					<li>
						<div className="form-group">
							<select className="form-control" style={{ padding: "0 15px", fontSize: "18px", color: "#999" }} id="exampleFormControlSelect1" placeholder="Select the Role" name="phone" onChange={(e) => setRole(e.target.value)}>
								<option>Select the Role</option>
								<option>Admin</option>
								<option>User</option>
							</select>
						</div>
					</li>
					<li>
						<button type="submit" className="button primary">
							Register
						</button>
					</li>
					<li>
						<div class="g-signin2" data-onsuccess="onSignIn"></div>
					</li>
				</ul>
			</form>
		</div>
	);
}
export default RegisterScreen;
