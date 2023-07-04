/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSliders,
	faMagnifyingGlass,
	faFeather,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import NavProfile from "./NavProfile";
import { useSelector } from "react-redux";
import Logo from "../../src/assets/img/logo.png";
import axios from "axios";
import Card from "../components/article/Card";
import LikeButton from "./article/LikeButton";
import DeleteButton from "./article/DeleteButton";
const Navbar = () => {
	const isLogin = useSelector((state) => state.auth.login);
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const handleClick = (id) => {
		navigate(`blog/${id}`);
		window.location.reload();
	};

	const isMyArticlePage = location.pathname === "/my-article";

	const navLinks = [
		{ name: "My Article", link: "/my-article" },
		{ name: "My Fav Article", link: "/liked-article" },
		{ name: "Write", link: "/create-article" },
	];

	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://minpro-blog.purwadhikabootcamp.com/api/blog?search=${query}&sortBy=title`
				);
				setResults(response.data.result);
				console.log(response.data.result);
			} catch (error) {
				console.log("Terjadi kesalahan:", error);
			}
		};

		fetchData();
	}, [query]);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-white fixed w-full top-0 z-50 py-2 border-b-2 border-blue-500 shadow-md">
			<div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between h-14">
				<button
					className="md:flex items-center hidden"
					onClick={() => navigate("/")}
				>
					<img src={Logo} alt="logo" className="w-16 mr-4" />
					<p className="text-2xl font-semibold text-blue-500">Newsy!</p>
				</button>
				<div className="pr-2 rounded-xl border-2  border-blue-500 flex items-center w-1/2 md:w-1/5">
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className="text-blue-500 px-2"
						size="lg"
					/>
					<input
						type="search"
						placeholder="Search.."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="px-3 text-blue-400 py-2 bg-opacity-50 w-full outline-none border-none focus:ring-0 rounded-xl"
					/>
				</div>

				<div className="z-50">
					<div className="absolute top-16 z-50 left-[30%] bg-white rounded-xl shadow-lg w-1/3 overflow-y-auto max-h-screen">
						{results.map((result) => {
							if (query.length > 0) {
								return (
									<div className="flex border-2 border-blue-500 rounded-lg px-4 py-2 shadow-md hover:cursor-pointer hover:shadow-xl transition duration-300 ease-in-out bg-white m-2">
										<div className="relative truncate flex justify-between items-center mr-5">
											<img
												className="object-cover object-center w-28 rounded-lg h-28"
												src={`https://minpro-blog.purwadhikabootcamp.com/${result.imageURL}`}
												alt={result.title}
											/>

											<div className="absolute w-36 bottom-0 flex p-2 bg-white rounded-tr-lg">
												{result.User?.imgProfile ? (
													<img
														className="object-cover object-center w-10 h-10 rounded-full"
														src={`https://minpro-blog.purwadhikabootcamp.com/${result.User?.imgProfile}`}
														alt="profile"
													/>
												) : (
													<FontAwesomeIcon
														icon={faUser}
														className="text-blue-400 hover:text-blue-500 hover:cursor-pointer px-[5px] py-1 rounded-full border-4 border-double border-blue-500"
													/>
												)}

												<div className="mx-4 truncate capitalize">
													<h1 className="truncate text-sm text-gray-700 dark:text-gray-200">
														{result.User?.username}
													</h1>
													<p className="text-sm text-gray-500 dark:text-gray-400">
														{result.country}
													</p>
												</div>
											</div>
										</div>
										<div className="truncate">
											<h1 className="truncate font-semibold text-gray-800 dark:text-white">
												{result.title}
											</h1>

											<p className="text-sm truncate text-gray-500 dark:text-gray-400">
												{result.content}
											</p>
											<button
												onClick={() => handleClick(result.id)}
												className="text-blue-500 hover:underline"
											>
												Read More
											</button>
											<div className="flex justify-between">
												<LikeButton data={result} />
												{isMyArticlePage && <DeleteButton blogId={result.id} />}
											</div>
										</div>
									</div>
								);
							} else {
								return null;
							}
						})}
					</div>
				</div>
				<div className="md:hidden">
					<button
						onClick={toggleMenu}
						className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
					>
						{isOpen ? (
							<FontAwesomeIcon icon={faSliders} />
						) : (
							<FontAwesomeIcon icon={faSliders} rotation={180} />
						)}
					</button>
				</div>
				<div className={`hidden md:block ${isOpen ? "block" : "hidden"}`}>
					<div className="ml-4 flex items-center md:ml-6">
						{navLinks.map((link, index) => {
							if (isLogin) {
								return (
									<button
										onClick={() => navigate(link.link)}
										key={index}
										className="mr-5 text-blue-500  hover:text-blue-700"
									>
										{link.name}
									</button>
								);
							} else {
								return null;
							}
						})}

						{isLogin ? (
							<NavProfile />
						) : (
							<button
								className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
								onClick={() => navigate("/login")}
							>
								Login
							</button>
						)}
					</div>
				</div>
			</div>
			<div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col text-center">
					{navLinks.map((link, index) => {
						if (isLogin) {
							return (
								<button
									onClick={() => navigate(link.link)}
									key={index}
									className="mr-5 text-blue-500  hover:text-blue-700"
								>
									{link.name}
								</button>
							);
						} else {
							return null;
						}
					})}
					{isLogin ? (
						<NavProfile />
					) : (
						<button
							onClick={() => navigate("/login")}
							className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
						>
							Login
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
