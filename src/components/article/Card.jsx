import { useNavigate, useLocation } from "react-router-dom";
import { faTrash, faUser, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const Card = ({ data }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [openModal, setOpenModal] = useState();
	const props = { openModal, setOpenModal };

	const handleClick = (id) => {
		navigate(`blog/${id}`);
		// window.location.reload();
	};

	const isMyArticlePage = location.pathname === "/my-article";
	const isHome = location.pathname === "/";
	return (
		<>
			<div className="rounded-lg p-4 max-w-full shadow-md hover:cursor-pointer hover:shadow-xl transition duration-300 ease-in-out bg-white m-2">
				<div className="relative truncate">
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
				{isHome && (
					<button
						onClick={() => handleClick(data.id)}
						className="text-blue-500 hover:underline"
					>
						Read More
					</button>
				)}
				<div className="flex justify-between items-center">
					<LikeButton data={data} />
					{isMyArticlePage && (
						<div>
							<Button
								className="bg-red-600 hover:bg-red-700"
								onClick={() => props.setOpenModal("pop-up")}
							>
								<FontAwesomeIcon icon={faTrash} className="mr-3" />
								Delete
							</Button>
							<Modal
								show={props.openModal === "pop-up"}
								size="md"
								popup
								onClose={() => props.setOpenModal(undefined)}
							>
								<Modal.Header />
								<Modal.Body>
									<div className="text-center">
										<FontAwesomeIcon
											icon={faWarning}
											className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
										/>
										<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
											Are you sure you want to delete this blog?
										</h3>
										<div className="flex justify-center gap-4">
											<DeleteButton blogId={data.id}>
												Yes, I'm sure
											</DeleteButton>
											<Button
												color="gray"
												onClick={() => props.setOpenModal(undefined)}
											>
												No, cancel
											</Button>
										</div>
									</div>
								</Modal.Body>
							</Modal>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Card;
