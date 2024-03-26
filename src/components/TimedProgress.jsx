import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";

const pollMs = 100;

export default function TimedProgress({ duration, ...rest }) {
	const startTime = useRef(Date.now());

	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (progress >= 100) {
			return;
		}
		const timer = setInterval(() => {
			const diffTimeSec = (Date.now() - startTime.current) / 1000;
			const newProgress = (diffTimeSec / duration) * 100;
			setProgress(Math.min(newProgress, 100));
		}, pollMs);
		return () => clearTimeout(timer);
	}, [progress, duration]);

	return <CircularProgress variant="determinate" value={progress} {...rest} />;
}
