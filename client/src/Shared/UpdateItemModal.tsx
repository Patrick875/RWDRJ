import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import instance from "../API";
import toast from "react-hot-toast";

interface Props {
	show: boolean;
	data: any;
	setShow: (show: boolean) => void;
	itemType: string;
	itemId: string | undefined;
	updateUrl: string;
}
const UpdateItemModal = ({
	show,
	setShow,
	itemId,
	data,
	itemType,
	updateUrl,
}: Props): ReactNode => {
	const navigate = useNavigate();
	const updateItem = async () => {
		await instance
			.patch(`${updateUrl}/${itemId}`, data)
			.then(() => {
				toast.success(`${itemType} updated successfully`);
				navigate(-1);
			})
			.catch((err) => {
				toast.error(err.code);
			});
	};
	return (
		<>
			<Modal
				show={show}
				size="md"
				onClose={() => {
					setShow(false);
				}}
				popup>
				<Modal.Header className="bg-primary-white" />
				<Modal.Body className="bg-primary-white">
					<div className="text-center ">
						<HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-700 h-14 w-14 dark:text-gray-700" />
						<p className="my-2 text-lg font-semibold">
							This update may affect different parts of the website in terms of
							visible content
						</p>
						<h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-700">
							Are you sure you want to update {itemType}?
						</h3>
						<div className="flex justify-center gap-4">
							<Button
								color="failure"
								onClick={() => {
									console.log("this is data", data);

									updateItem();
									setShow(false);
								}}>
								{"Yes, I'm sure"}
							</Button>
							<Button
								color="gray"
								onClick={() => {
									setShow(false);
								}}>
								No, cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default UpdateItemModal;
