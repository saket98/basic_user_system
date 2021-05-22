import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register, signin } from "../Action/userAction";
import image from "../logo1.png";

function Login(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [role, setRole] = useState("");
	const [phone, setPhone] = useState("");
	const dispatch = useDispatch();

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	/* console.log(props)

	useEffect(() => {
		if (userInfo) {
			props.history.push("/check");
		}
	}, [props.history, userInfo]); */

	const submitHandlerRegister = (e) => {
		e.preventDefault();
		dispatch(register(name, email, password, password2, phone, role));
	};

	const submitHandlerLogin = async (e) => {
		e.preventDefault();
		let a = dispatch(signin(email, password));
		console.log(a);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-4 col-md-offset-4" style={{ boxShadow: "1px 1px 4px 3px #C2B8B8", background: "#fff", marginTop: "5%" }}>
					<div className="col-md-12 text-center" style={{ borderBottom: "1px dashed #000", paddingBottom: "10px", marginBottom: "10px" }}>
						<img class=" text-center" alt="Logo" src={image} />
					</div>

					<ul className="nav nav-tabs" role="tablist">
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
					</ul>
					<div className="tab-content">
						<form onSubmit={submitHandlerRegister}>
							<div className="tab-pane fade in active" id="new">
								<br />
								<fieldset>
									<div className="form-group">
										<div className="right-inner-addon">
											<i className="glyphicon glyphicon-envelope" />
											<input className="form-control input-lg" placeholder="Name" type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
										</div>
									</div>
									<div className="form-group">
										<div className="right-inner-addon">
											<i className="glyphicon glyphicon-lock" />
											<input className="form-control input-lg" placeholder="Enter Email ID" type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
										</div>
									</div>
									<div className="form-group">
										<div className="right-inner-addon">
											<i className="glyphicon glyphicon-lock" />
											<input className="form-control input-lg" placeholder="Password" type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
										</div>
									</div>
									<div className="form-group">
										<div className="right-inner-addon">
											<i className="glyphicon glyphicon-envelope" />
											<input className="form-control input-lg" placeholder="Confirm Password" type="password" id="rePassword" name="rePassword" onChange={(e) => setPassword2(e.target.value)} />
										</div>
									</div>
									<div className="form-group">
										<div className="right-inner-addon">
											<i className="glyphicon glyphicon-phone" />
											<input className="form-control input-lg" placeholder="Enter Phone Number " name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} type="text" />
										</div>
									</div>
									<div className="form-group">
										<select className="form-control" style={{ padding: "0 15px", fontSize: "18px", color: "#999" }} id="exampleFormControlSelect1" placeholder="Select the Role" name="phone" onChange={(e) => setRole(e.target.value)}>
											<option>Select the Role</option>
											<option>Admin</option>
											<option>User</option>
										</select>
									</div>
									<div className=" text-center">
										<button type="submit" className="btn btn-success btn-block">
											SIGN UP
										</button>
									</div>
								</fieldset>
							</div>
						</form>
						<form onSubmit={submitHandlerLogin}>
							<div className="tab-pane fade" id="user">
								<br />
								<fieldset>
									<div className="form-group">
										<div className="right-inner-addon">
											<i className="glyphicon glyphicon-envelope" />
											<input className="form-control input-lg" placeholder="Enter Email ID" type="text" name="email" id="loginemail" onChange={(e) => setEmail(e.target.value)} />
										</div>
									</div>
									<div className="form-group">
										<div className="right-inner-addon">
											<i className="glyphicon glyphicon-lock" />
											<input className="form-control input-lg" placeholder="Password" type="password" id="loginpassword" name="password" onChange={(e) => setPassword(e.target.value)} />
										</div>
									</div>
								</fieldset>
								<div className=" text-center">
									<button type="submit" className="btn btn-success btn-block">
										<Link to="/dashbord">LOGIN</Link>
									</button>
								</div>
							</div>
						</form>
						<br />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
