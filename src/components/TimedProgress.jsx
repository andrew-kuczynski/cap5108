import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

const stepSize = 1;
const steps = 100 / stepSize;

export default function TimedProgress({ duration }) {
	const [progress, setProgress] = useState(0);
	const stepDuration = (duration / steps) * 1000;

	useEffect(() => {
		if (progress === 100) {
			return;
		}
		const timer = setTimeout(() => {
			setProgress((p) => p + 1);
		}, stepDuration);
		return () => clearTimeout(timer);
	}, [progress, stepDuration]);

	return <CircularProgress variant="determinate" value={progress} />;
}
