import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import ChangePhone from "./ChangePhone";
import ChangePhoto from "./ChangePhoto";
import ChangeUsername from "./ChangeUsername";
const ProfilePage = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const [active, setActive] = useState(null);
	useEffect(() => {
		const token = localStorage.getItem("token");
		dispatch(fetchUser(token));
	}, [dispatch]);

	const handleChangeComponent = (active) => {
		setActive(active);
	};
	return (
		<>
			{user ? (
				<div className="flex container mx-auto pt-[100px]">
					<div className="w-1/4 p-4 fixed h-90 shadow-md rounded-2xl">
						{/* Sidebar */}
						<div className="flex flex-col items-center">
							<div className="border-4 border-double border-purple-500 py-5 px-6 rounded-full">
								{user.imageProfile ? (
									<img
										src={`https://minpro-blog.purwadhikabootcamp.com/${user.imageProfile}`}
										alt="profile"
										className="w-24 h-24 rounded-full mb-4"
									/>
								) : (
									<FontAwesomeIcon
										icon={faUser}
										size="2x"
										className="text-purple-400 hover:text-purple-500 hover:cursor-pointer"
									/>
								)}
							</div>
							<h2 className="text-xl font-semibold">{user.username}</h2>
							<p className="text-gray-600">{user.email}</p>

							<div className="flex flex-col">
								<button
									className="bg-purple-500 text-white rounded-md w-52 py-2 my-1"
									onClick={() => handleChangeComponent("ChangePassword")}
								>
									Change Password
								</button>
								<button
									className="bg-purple-500 text-white rounded-md w-52 py-2 my-1"
									onClick={() => handleChangeComponent("ChangeEmail")}
								>
									Change Email
								</button>
								<button
									className="bg-purple-500 text-white rounded-md w-52 py-2 my-1"
									onClick={() => handleChangeComponent("ChangePhone")}
								>
									Change Phone
								</button>
								<button
									className="bg-purple-500 text-white rounded-md w-52 py-2 my-1"
									onClick={() => handleChangeComponent("ChangeUsername")}
								>
									Change Usename
								</button>
								<button
									className="bg-purple-500 text-white rounded-md w-52 py-2 my-1"
									onClick={() => handleChangeComponent("ChangePhoto")}
								>
									Change Photo
								</button>
							</div>
						</div>
					</div>
					{/* Profile detail */}
					<div className="w-2/3 p-4 ml-auto">
						<div className="bg-white rounded-3xl shadow-md p-6">
							<h2 className="text-2xl font-semibold mb-4 text-center">
								Profile
							</h2>
							<div className="grid grid-cols-3">
								<div className="text-center">
									{user.imageProfile ? (
										<img
											src={`https://minpro-blog.purwadhikabootcamp.com/${user.imageProfile}`}
											alt="profile"
											className="text-purple-400 hover:text-purple-500 hover:cursor-pointer border-4 border-double border-purple-500 py-5 px-6 rounded-full text-center"
										/>
									) : (
										<FontAwesomeIcon
											icon={faUser}
											size="2x"
											className="text-purple-400 hover:text-purple-500 hover:cursor-pointer border-4 border-double border-purple-500 py-5 px-6 rounded-full text-center"
										/>
									)}
								</div>
								{/* profil konten */}

								<div className="col-span-2">
									{active === "ChangePassword" && <ChangePassword />}
									{active === "ChangeEmail" && <ChangeEmail />}
									{active === "ChangePhone" && <ChangePhone />}
									{active === "ChangeUsername" && <ChangeUsername />}
									{active === "ChangePhoto" && <ChangePhoto />}
									{active === null && (
										<div>
											<h2 className="text-xl font-semibold">{user.username}</h2>
											<p className="text-gray-600">{user.email}</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				console.log("no user")
			)}
		</>
	);
};

export default ProfilePage;
