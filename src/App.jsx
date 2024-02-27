import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

import { useCallback, useState } from "react";
import ProgressCondition from "./components/ProgressCondition";

const DURATION_SEC = 6;

const CONDITIONS = {
	DETERMINATE: 1,
	INDETERMINATE: 2,
	CONTROL: 3,
};

// random number 1-3
const getRandomCondition = () => {
	return Math.floor(Math.random() * 3) + 1;
};

function App() {
	const [state, setState] = useState("START");

	const [condition] = useState(() => {
		// const localCondition = localStorage.getItem("condition");
		// if (
		// 	localCondition === "1" ||
		// 	localCondition === "2" ||
		// 	localCondition === "3"
		// ) {
		// 	return parseInt(localCondition);
		// }
		const rand = getRandomCondition();
		localStorage.setItem("condition", `${rand}`);
		return rand;
	});

	const onComplete = useCallback(() => {
		setState("LOADING_DONE");
	}, []);

	const view = {
		START: (
			<Button variant="contained" onClick={() => setState("LOADING")}>
				Start
			</Button>
		),
		LOADING: (
			<ProgressCondition
				condition={CONDITIONS.DETERMINATE}
				duration={DURATION_SEC}
				onComplete={onComplete}
				// size={40}
				// thickness={4}
			/>
		),
		LOADING_DONE: (
			<div>
				<div>Loading complete</div>
				<Button variant="contained" onClick={() => setState("SURVEY")}>
					Continue
				</Button>
			</div>
		),
		SURVEY: <div>Survey</div>,
	};

	return (
		<>
			<CssBaseline />
			<Container
				maxWidth="sm"
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<Paper
					style={{
						margin: "8px 0",
						padding: 16,
						maxHeight: "100%",
						height: 500,
					}}
				>
					{view[state]}
				</Paper>
			</Container>
		</>
	);
}

export default App;
