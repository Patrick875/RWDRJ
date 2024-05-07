import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

function AnimatePage({ children }: Props) {
	const animations = {
		initial: { opacity: 0, x: -100 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -100 },
	};
	return (
		<motion.div
			variants={animations}
			transition={{ duration: 1 }}
			initial="initial"
			exit="exit"
			animate="animate">
			{children}
		</motion.div>
	);
}

export default AnimatePage;
