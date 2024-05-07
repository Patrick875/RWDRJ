import React, { useState, useEffect, useRef } from "react";

interface CountProps {
	countTo: number;
	interval: number;
}

const Count: React.FC<CountProps> = ({ countTo, interval }) => {
	const [count, setCount] = useState(0);
	const countRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setCount(0); // Reset count
					startCounting();
				}
			},
			{ root: null, rootMargin: "0px", threshold: 0.5 }
		);

		if (countRef.current) {
			observer.observe(countRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []); // Only run once on mount

	const startCounting = () => {
		let currentCount = 0;
		const timer = setInterval(() => {
			if (currentCount < countTo) {
				setCount((prevCount) => prevCount + 1);
				currentCount++;
			} else {
				clearInterval(timer);
			}
		}, interval);

		return () => clearInterval(timer);
	};

	return (
		<p className="font-hanuman" ref={countRef}>
			{count}
		</p>
	);
};

export default Count;
