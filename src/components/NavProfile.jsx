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
				className="relative w-16 h-16 rounded-full border-4 border-purple-400 border-double"
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
							className="text-purple-400 hover:text-purple-500 hover:cursor-pointer "
						/>
					)}
				</button>
				<ul
					className={`absolute top-15 -left-16 w-48 bg-white rounded-md shadow-lg p-4 ${
						isOpen ? "block" : "hidden"
					}`}
				>
					{loading && <p>loading...</p>}
					<li>
						<FontAwesomeIcon icon={faUser} />
						<p>{user ? user.username : "no user"}</p>
					</li>
					<li>
						<FontAwesomeIcon icon={faMailBulk} />
						<p>{user ? user.email : "no user"}</p>
					</li>

					<li>
						<button onClick={() => logout()}>logout</button>
					</li>
				</ul>
			</div>
		</>
	);
};

export default AvatarProfile;
