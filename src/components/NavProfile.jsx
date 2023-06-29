import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../features/authSlice";
import { fetchUser } from "../features/userSlice";
const AvatarProfile = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, loading } = useSelector((state) => state.user);

	useEffect(() => {
		const token = localStorage.getItem("token");
		dispatch(fetchUser(token));
	}, [dispatch]);

	const logout = () => {
		dispatch(logoutSuccess());
		navigate("/");
	};
	return (
		<>
			<div
				onMouseLeave={() => setIsOpen(false)}
				className="relative w-16 h-16 rounded-full border-4 border-blue-400 border-double"
			>
				<button
					onClick={() => navigate("/Profile")}
					onMouseOver={() => setIsOpen(true)}
				>
					{user?.imgProfile ? (
						<img
							className="mx-auto object-cover rounded-full"
							src={`https://minpro-blog.purwadhikabootcamp.com/${user?.imgProfile}`}
							alt="profile"
						/>
					) : (
						<FontAwesomeIcon
							icon={faUser}
							className="text-blue-400 hover:text-blue-500 hover:cursor-pointer mt-5 ml-5"
						/>
					)}
				</button>
				<ul
					className={`absolute top-15 -left-16 max-w-lg bg-white rounded-md shadow-lg p-4 ${
						isOpen ? "block" : "hidden"
					}`}
				>
					{loading && <p>loading...</p>}
					<li className="mb-3 flex items-center">
						<FontAwesomeIcon icon={faUser} className="text-blue-500 mr-3" />
						<p>{user ? user.username : "no user"}</p>
					</li>
					<li className="mb-3 flex items-center">
						<FontAwesomeIcon icon={faMailBulk} className="text-blue-500 mr-3" />
						<p>{user ? user.email : "no user"}</p>
					</li>

					<li>
						<button
							onClick={() => logout()}
							className="text-red-500 border border-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white w-full"
						>
							logout
						</button>
					</li>
				</ul>
			</div>
		</>
	);
};

export default AvatarProfile;
