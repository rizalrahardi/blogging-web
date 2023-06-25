/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAt,
	faEye,
	faFingerprint,
	faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
const RegisterForm = ({
	handleSignUp,
	email,
	password,
	username,
	setEmail,
	setPassword,
	setUsername,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	return (
		<div>
			<form onSubmit={handleSignUp}>
				<div className="mb-4">
					<label htmlFor="email" className="block mb-1 font-medium">
						Email
					</label>
					<div className="relative flex w-full flex-wrap items-stretch mb-3">
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border outline-none focus:outline-none focus:ring w-full pr-10"
							required
							placeholder="input your email.."
						/>
						<span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-2">
							<FontAwesomeIcon icon={faAt} />
						</span>
					</div>
				</div>
				<div className="mb-4">
					<label htmlFor="password" className="block mb-1 font-medium">
						Password
					</label>
					<div className="relative flex w-full flex-wrap items-stretch mb-3">
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border outline-none focus:outline-none focus:ring w-full pr-10"
							required
							placeholder="input your password..."
						/>
						<span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-2">
							<button type="button" onClick={handleShowPassword}>
								{showPassword ? (
									<FontAwesomeIcon icon={faEye} />
								) : (
									<FontAwesomeIcon icon={faEyeSlash} />
								)}
							</button>
						</span>
					</div>
				</div>
				<div className="mb-4">
					<label htmlFor="username" className="block mb-1 font-medium">
						Username
					</label>
					<div className="relative flex w-full flex-wrap items-stretch mb-3">
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border outline-none focus:outline-none focus:ring w-full pr-10"
							required
							placeholder="input your username..."
						/>
						<span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-2">
							<FontAwesomeIcon icon={faFingerprint} />
						</span>
					</div>
				</div>
				<button
					type="submit"
					className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
				>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default RegisterForm;
