import CssBaseline from "@mui/material/CssBaseline";
import { useCallback } from "react";
import ProgressCondition from "./components/ProgressCondition";

const DURATION_SEC = 6;
const CONDITIONS = {
	DETERMINATE: 1,
	INDETERMINATE: 2,
	CONTROL: 3,
};

function App() {
	const onComplete = useCallback(() => {
		console.log("done");
	}, []);

	return (
		<>
			<CssBaseline />
			<div>
				<ProgressCondition
					condition={CONDITIONS.DETERMINATE}
					duration={DURATION_SEC}
					onComplete={onComplete}
				/>
				<ProgressCondition
					condition={CONDITIONS.INDETERMINATE}
					duration={DURATION_SEC}
					onComplete={onComplete}
				/>
			</div>
		</>
	);
}

export default App;
