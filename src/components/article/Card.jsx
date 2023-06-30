import { useNavigate, useLocation } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const Card = ({ data }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = (id) => {
		navigate(`blog/${id}`);
		window.location.reload();
	};

	const isMyArticlePage = location.pathname === "/my-article";

	return (
		<>
			<div className="rounded-lg p-4 shadow-md hover:cursor-pointer hover:shadow-xl transition duration-300 ease-in-out bg-white m-2">
				<div className="relative truncate">
					<h1 className="font-bold text-2xl mx-2 text-center">Hot News!</h1>
					<img
						className="object-cover object-center w-full h-96 rounded-lg lg:h-70"
						src={`https://minpro-blog.purwadhikabootcamp.com/${data.imageURL}`}
						alt={data.title}
					/>

					<div className="absolute w-36 bottom-0 flex p-3 bg-white rounded-tr-lg">
						{data.User?.imgProfile ? (
							<img
								className="object-cover object-center w-10 h-10 rounded-full"
								src={`https://minpro-blog.purwadhikabootcamp.com/${data.User?.imgProfile}`}
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
								{data.User?.username}
							</h1>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								{data.country}
							</p>
						</div>
					</div>
				</div>

				<h1 className="truncate mt-6 font-semibold text-gray-800 dark:text-white h-14">
					{data.title}
				</h1>

				<p className="text-sm text-gray-500 dark:text-gray-400 truncate">
					{data.content}
				</p>
				<button
					onClick={() => handleClick(data.id)}
					className="text-blue-500 hover:underline"
				>
					Read More
				</button>
				<div className="flex justify-between">
					<LikeButton data={data} />
					{isMyArticlePage && <DeleteButton blogId={data.id} />}
				</div>
			</div>
		</>
	);
};

export default Card;
