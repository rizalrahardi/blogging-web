import { useState } from "react";
import ButtonModal from "./ButtonModal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const SignInModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isSignIn, setIsSignIn] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	const handleSignIn = (e) => {
		e.preventDefault();
		console.log("Sign In - Email:", email);
		console.log("Sign In - Password:", password);
		setEmail("");
		setPassword("");
		toggleModal();
	};

	const handleSignUp = (e) => {
		e.preventDefault();
		console.log("Sign Up - Email:", email);
		console.log("Sign Up - Password:", password);
		console.log("Sign Up - Username:", username);
		setEmail("");
		setPassword("");
		setUsername("");
		toggleModal();
	};

	const switchForm = () => {
		setIsSignIn(!isSignIn);
		setEmail("");
		setPassword("");
		setUsername("");
	};

	const btnContent = "Sign In";

	return (
		<div className="relative">
			<div>
				<ButtonModal btnContent={btnContent} toggleModal={toggleModal} />
			</div>

			{isOpen && (
				<div className="fixed inset-0 flex justify-center items-center z-50 ">
					<div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
					<div className="relative bg-white py-8 px-10 md:py-10 md:px-16 rounded-[30px] shadow-xl w-full md:w-1/2 xl:w-1/4 transition-opacity duration-500 ease-in-out">
						<button
							onClick={toggleModal}
							className="absolute top-0 right-0 m-4 w-8 h-8 text-gray-500 hover:text-gray-900 hover:rounded-full hover:bg-slate-200"
						>
							<FontAwesomeIcon icon={faClose} />
						</button>
						<h2 className="text-lg text-center font-semibold my-4">
							{isSignIn ? "Sign In" : "Sign Up"}
						</h2>
						{isSignIn ? (
							<LoginForm handleSignIn={handleSignIn} />
						) : (
							<RegisterForm handleSignUp={handleSignUp} />
						)}
						<div className="text-center mt-4">
							{isSignIn ? "Don't have an account?" : "Already have an account?"}
							<a
								onClick={switchForm}
								className="ml-1 text-blue-500 underline hover:text-blue-700 cursor-pointer"
							>
								{isSignIn ? "Sign Up" : "Sign In"}
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SignInModal;
