//jshint esversion:9
import { useState, useEffect } from "react";
import instance from "../API";

interface FetchDataResponse<T> {
	data: T;
}

const useFetchData = <T,>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await instance.get<FetchDataResponse<T>>(url);
				if (response.data && response.data.data) {
					setData(response.data.data);
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error, setData };
};

export default useFetchData;
