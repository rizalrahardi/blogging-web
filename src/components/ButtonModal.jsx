/* eslint-disable react/prop-types */
// import React from "react";

const ButtonModal = ({ btnContent, toggleModal }) => {
	return (
		<div>
			<button
				onClick={toggleModal}
				className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
			>
				{btnContent}
			</button>
		</div>
	);
};

export default ButtonModal;
