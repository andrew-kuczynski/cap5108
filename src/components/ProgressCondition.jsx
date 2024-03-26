import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import TimedProgress from "./TimedProgress";

// condition 1 = determinate (progress)
// condition 2 = indeterminate (spinner)
// condition 3 = control (nothing)

export default function ProgressCondition({
	duration,
	condition,
	onComplete,
	...rest
}) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onComplete?.();
		}, duration * 1000);
		return () => clearTimeout(timer);
	}, [duration, onComplete]);

	if (condition === 1) {
		return <TimedProgress duration={duration} {...rest} />;
	}

	if (condition === 2) {
		return <CircularProgress variant="indeterminate" {...rest} />;
	}

	return null;
}
