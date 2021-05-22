import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import image from "../logo1.png";
import { userList, deleteUser } from "../Action/userAction";

function UserManagment(props) {
	const dispatch = useDispatch();
	const users = props?.userData?.userData?.data?.user;

	useEffect(() => {
		dispatch(userList());
		return () => {
			//
		};
	}, [dispatch]);

	useEffect(() => {
		console.log(users)
	}, [props.state]);

	const deleteHandler = (user) => {
		dispatch(deleteUser(user._id));
	};

	return (
		<BrowserRouter>
			<div>
				<div>
					<div className="container">
						<div className="row">
							<header className="clearfix">
								<nav className="navbar navbar-default" style={{ boxShadow: "1px 1px 4px 3px #C2B8B8", padding: "10px" }}>
									<div className="container">
										<ul className="nav navbar-nav">
											<li>
												<a href className="navbar-brand" style={{ padding: "6px" }}>
													<img className=" text-center" alt="Logo" src={image} style={{ height: "40px" }} />
												</a>
											</li>
											<li style={{ fontWeight: "bold", paddingTop: "15px" }}>User Management</li>
										</ul>
										<ul className="nav navbar-nav navbar-right">
											<li>
												<div className="inset" style={{ marginRight: "20px" }}>
													{/* <h4>{userInfo ? <Link to="/profile">{userInfo.name}</Link> : <Link to="/signin">Sign In</Link>}</h4> */}
												</div>
											</li>
										</ul>
									</div>
								</nav>
							</header>
						</div>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-md-12 " style={{ boxShadow: "1px 1px 4px 3px #C2B8B8", background: "#fff", padding: "15px 10px" }}>
								<table className="table table-hover table-bordered ">
									<thead style={{ background: "#4caf50", color: "#fff" }}>
										<tr>
											<th className="text-center">First Name</th>
											<th className="text-center">Role</th>
											<th className="text-center">Email</th>
											<th className="text-center">Phone Number</th>
											<th className="text-center">Delete</th>
										</tr>
									</thead>
									{
										<tbody>
											{users?.map?.((user) => (
												<tr key={user._id}>
													<td>{user.name}</td>
													<td>{user.role}</td>
													<td>{user.email}</td>
													<td>{user.phone}</td>
													<td className="text-center text-danger">
														<button onClick={() => deleteHandler(user)}>
															<i className="glyphicon glyphicon-trash text-danger" />
														</button>
													</td>
												</tr>
											))}
										</tbody>
									}
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}

function mapStateToProps(state) {
	return {
		userData: state.userList,
	};
}

function mapDispatchToProps(dispatch) {}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagment);
