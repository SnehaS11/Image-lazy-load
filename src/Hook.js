import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (props) => {
	const [elements, setElements] = useState([]);
	const [entries, setEntries] = useState([]);

	const observer = useRef(null);

	const { threshold, root } = props || {}

	useEffect(() => {
		if (elements.length) {
			observer.current = new IntersectionObserver((ioEntries) => {
				setEntries(ioEntries);
			}, {
				threshold,
				root
			});

			elements.forEach(element => {
				observer.current.observe(element);
			});
		}
		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		}
	}, [elements, root, threshold]);

	return [observer.current, setElements, entries];
};

export default useIntersectionObserver;
