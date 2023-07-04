import axios from "axios";
import { toast } from "react-toastify";

const DeleteButton = ({ blogId }) => {
	const removeBlog = async () => {
		try {
			const token = localStorage.getItem("token");

			const headers = {
				Authorization: `Bearer ${token}`,
			};

			await axios.patch(
				`https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${blogId}`,
				{},
				{ headers }
			);
			toast.success("Blog with id " + blogId + " removed successfully");
			setTimeout(() => {
				window.location.href = "/my-article";
			}, 1500);

			console.log(`Blog with id ${blogId} removed successfully`);
		} catch (error) {
			console.error("Error removing blog", error);
		}
	};

	return (
		<div>
			<button
				className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
				onClick={() => removeBlog()}
			>
				Remove
			</button>
		</div>
	);
};

export default DeleteButton;
