import axios from "axios";

const Verify = () => {
	const token = async () => {
		const url = window.location.href.split("/");
		const getToken = url[url.length - 1];
		console.log(getToken);

		try {
			const data = await axios.patch(
				"https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
				{},
				{
					headers: {
						Authorization: `Bearer ${getToken}`,
					},
				}
			);
			console.log(data);
			alert("Your account has been verified");
			window.location.href = "/login";
		} catch (error) {
			console.log(error.response.data);
		}
	};
	return (
		<div className="pt-20 text-center">
			<div className="text-2xl mb-4">
				<p>congratulations! your account has been created</p>
				<p>
					just one step again, please verify your account with click the button
					verify
				</p>
			</div>
			<button
				onClick={token}
				className="py-2 px-6 text-white bg-blue-500 rounded-full hover:bg-blue-600"
			>
				Verify my Acccount
			</button>
		</div>
	);
};

export default Verify;
