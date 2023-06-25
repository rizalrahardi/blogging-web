/* eslint-disable react/prop-types */
import Card from "./Card";
// import { useState } from "react";
// import React from 'react'

const ArticleArea = ({ data }) => {
	// const dataBlog = [
	// 	{
	// 		name: "kelly",
	// 		profession: "Frontend Developer",
	// 		alt: "Card 1",
	// 		url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
	// 		title: "how to make a card",
	// 		content: "lorem ipsum dolor sit amet",
	// 	},
	// 	{
	// 		name: "fatimah",
	// 		profession: "Backend Developer",
	// 		alt: "Card 2",
	// 		url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
	// 		title: "how to make a card",
	// 		content: "lorem ipsum dolor sit amet",
	// 	},
	// 	{
	// 		name: "billie elish",
	// 		profession: "UI/UX Designer",
	// 		alt: "Card 3",
	// 		url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
	// 		title: "how to make a card",
	// 		content: "lorem ipsum dolor sit amet",
	// 	},
	// ];

	// const [data] = useState(dataBlog);
	return (
		<div>
			<section className="bg-white rounded-lg">
				<div className="container px-6 py-10 mx-auto">
					<div className="text-center">
						<h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
							From the blog
						</h1>

						<p className="max-w-lg mx-auto mt-4 text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
						</p>
					</div>

					<div className="grid grid-cols-1 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
						{data.map((img, index) => {
							return <Card key={index} data={img} />;
						})}
					</div>
				</div>
			</section>
		</div>
	);
};

export default ArticleArea;
