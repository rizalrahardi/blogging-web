/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSliders,
	faMagnifyingGlass,
	faFeather,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import NavProfile from "./NavProfile";
import { useSelector } from "react-redux";
import Logo from "../../src/assets/img/logo.png";
const Navbar = () => {
	const isLogin = useSelector((state) => state.auth.login);
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const navLinks = [
		{ name: "Home", link: "/" },
		{ name: "About", link: "/about" },
		{ name: "Article", link: "/article" },
	];

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-white fixed w-full top-0 z-50 py-2 border-b-2 border-purple-500 shadow-md">
			<div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between h-16">
				<button
					className="md:flex items-center hidden"
					onClick={() => navigate("/")}
				>
					<img src={Logo} alt="logo" className="w-16 mr-4" />
					<p className="text-2xl font-semibold text-purple-500">Newsy!</p>
				</button>
				<div className="pr-2 rounded-xl border-2  border-purple-500 flex items-center w-1/2 md:w-1/5">
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className="text-purple-500 px-2"
						size="lg"
					/>
					<input
						type="search"
						placeholder="Search.."
						className="px-3 text-purple-400 py-2 bg-opacity-50 w-full  focus:outline-none"
					/>
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
							return (
								<a
									href={link.link}
									key={index}
									className="mr-5 text-purple-500  hover:text-purple-700"
								>
									{link.name}
								</a>
							);
						})}
						<div>
							<button className="mr-5 text-purple-500 hover:text-purple-700">
								<FontAwesomeIcon icon={faFeather} className="px-2" />
								Write
							</button>
						</div>
						{isLogin ? (
							<NavProfile />
						) : (
							<button
								className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
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
						return (
							<a
								href={link.link}
								key={index}
								className="mr-5 text-gray-300  hover:text-white"
							>
								{link.name}
							</a>
						);
					})}
					{isLogin ? (
						<NavProfile />
					) : (
						<button
							onClick={() => navigate("/login")}
							className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
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
