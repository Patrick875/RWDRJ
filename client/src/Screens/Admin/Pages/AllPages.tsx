import { useNavigate } from "react-router-dom";

interface webpage {
	link: string;
	name: string;
}

function AllPages() {
	const navigate = useNavigate();
	const pages: webpage[] = [
		{ name: "Advocacy", link: "advocacy" },
		// { name: "Digital Health", link: "digitalinfo" },
		{ name: "Contact Us", link: "contactus" },
		{ name: "Compaign And Organizing", link: "compaign" },
		// { name: "About Us", link: "aboutus" },
		{ name: "Training", link: "training" },
		{ name: "Our Team", link: "ourteam" },
	];

	return (
		<>
			<div className="bg-white">
				<div className="flex ">
					<div className="p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
						#
					</div>
					<div className="flex-1 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
						Page
					</div>
					{/* {<div className="flex-1 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
						Created
					</div>
					<div className="flex-1 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
						Last updated
					</div>} */}
				</div>
				{pages &&
					pages.map((page: webpage, index: number) => (
						<div
							key={page.link}
							className="flex cursor-pointer "
							onClick={() => {
								navigate(`${page.link}`);
							}}>
							<div className="p-3 py-2 text-xs font-semibold tracking-wide whitespace-nowrap">
								{index + 1}
							</div>
							<div className="flex-1 p-3 py-2 text-xs font-semibold tracking-wide capitalize whitespace-nowrap">
								{page.name}
							</div>
						</div>
					))}
			</div>
		</>
	);
}

export default AllPages;
