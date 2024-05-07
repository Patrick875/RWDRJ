import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import instance from "../API";
import { useNavigate } from "react-router-dom";

interface Props {
	show: boolean;
	setShow: (show: boolean) => void;
	itemType: string;
	itemId: number;
	deleteUrl: string;
}
const DeleteItemModal = ({
	show,
	setShow,
	itemId,
	itemType,
	deleteUrl,
}: Props) => {
	const navigate = useNavigate();
	const deleteItem = async () => {
		await instance
			.delete(`${deleteUrl}/${itemId}`)
			.then(() => {
				toast.success(`${itemType} deleted successfully`);
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
						<h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-700">
							Are you sure you want to delete this {itemType}?
						</h3>
						<div className="flex justify-center gap-4">
							<Button
								color="failure"
								onClick={() => {
									deleteItem();
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

export default DeleteItemModal;
