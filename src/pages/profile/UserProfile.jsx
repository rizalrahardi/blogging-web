import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
	const dispatch = useDispatch();
	const { user, loading, error } = useSelector((state) => state.user);

	useEffect(() => {
		const token = localStorage.getItem("token");
		dispatch(fetchUser(token));
	}, [dispatch]);

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
								<div className="col-span-2">
									<h2 className="text-xl font-semibold">{user.username}</h2>
									<p className="text-gray-600">{user.email}</p>
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
