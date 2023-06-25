import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/userSlice";

const UserComponent = () => {

	const dispatch = useDispatch();
	const { user, loading, error } = useSelector((state) => state.user);

	useEffect(() => {
		const token = localStorage.getItem("token");
		dispatch(fetchUser(token));
	}, [dispatch]);

	if (loading) {
		return <p>Loading user data...</p>;
	}
	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div className="container mx-auto">
			{user ? (
				<div>
					<h1 className="text-2xl font-bold mb-4">User Details</h1>
					<p>
						<strong>Name:</strong> {user.username}
					</p>
					<p>
						<strong>Email:</strong> {user.email}
					</p>
					{/* Add more user details as needed */}
				</div>
			) : (
				<p>No user data available.</p>
			)}
		</div>
	);
};

export default UserComponent;
