import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";

import { useCallback, useState } from "react";
import ProgressCondition from "./components/ProgressCondition";

const DURATION_SEC = 6;

// random number 1-3
const getRandomCondition = () => {
	return Math.floor(Math.random() * 3) + 1;
};

function StartView({ onStart }) {
	return (
		<div>
			<p>
				We are conducting research on a new technology for loading video content
				on the web.
			</p>
			<p>
				This demo and survey should take less a minute, please give it your
				undivided attention for the duration.
			</p>
			<p>
				On clicking <strong>Start</strong> a video will be begin loading. Note:
				the video is loading even if it looks like nothing is happening.
			</p>

			<div
				style={{
					textAlign: "center",
					paddingTop: 12,
				}}
			>
				<Button variant="contained" onClick={onStart}>
					Start
				</Button>
			</div>
		</div>
	);
}

function LoadingCompleteView({ onContinue }) {
	return (
		<div>
			<p>
				<span style={{ margin: "0 8px" }}>✅</span>Loading is complete.
			</p>
			<p>
				In interest of your time, the video will not be shown. Please continue
			</p>
			<div
				style={{
					textAlign: "center",
					paddingTop: 12,
				}}
			>
				<Button variant="contained" onClick={onContinue}>
					Continue
				</Button>
			</div>
		</div>
	);
}

function SurveyView({ condition }) {
	const surveyLinks = {
		1: "https://docs.google.com/forms/d/e/1FAIpQLSemLF3p1tRHHD4jFmUDNnnAF-U3YqOzUX-hAwY4ZENzQ2m90A/viewform?usp=sharing",
		2: "https://docs.google.com/forms/d/e/1FAIpQLSeOzQ-XcD78Vo_7TTPZR2iG8EI_blYHtuaFS32gGmFp0s9_BQ/viewform?usp=sharing",
		3: "https://docs.google.com/forms/d/e/1FAIpQLSflf2IWtv6lh1X9_h_k9w-nosuqzStGtF5M4fRUFCpiS8Bovw/viewform?usp=sharing",
	};

	return (
		<div>
			<p>
				Our demo is complete. Please help us collect data by completing a short
				survey.
			</p>
			<p>Thank you!</p>
			<p>
				<Link href={surveyLinks[condition]}>Go to Google Forms Survey</Link>
			</p>
		</div>
	);
}

function App() {
	const [state, setState] = useState(() => {
		if (localStorage.getItem("DONE")) {
			return "SURVEY";
		}
		return "START";
	});

	const [condition] = useState(() => {
		const localCondition = localStorage.getItem("condition");
		if (localCondition && ["1", "2", "3"].includes(localCondition)) {
			return Number.parseInt(localCondition);
		}
		const rand = getRandomCondition();
		localStorage.setItem("condition", rand.toString());
		return rand;
	});

	const onComplete = useCallback(() => {
		setState("LOADING_DONE");
	}, []);

	const onContinue = useCallback(() => {
		localStorage.setItem("DONE", "true");
		setState("SURVEY");
	}, []);

	const view = {
		START: <StartView onStart={() => setState("LOADING")} />,
		LOADING: (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
				}}
			>
				<ProgressCondition
					condition={condition}
					duration={DURATION_SEC}
					onComplete={onComplete}
					size={100}
				/>
			</div>
		),
		LOADING_DONE: <LoadingCompleteView onContinue={onContinue} />,
		SURVEY: <SurveyView condition={condition} />,
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
						minHeight: 500,
						fontSize: 22,
					}}
				>
					<div
						style={{
							display: "flex",
							gap: 8,
							justifyContent: "center",
							fontSize: 14,
						}}
					>
						<div>CAP5108</div>
						<div>-</div>
						<div>University of Florida</div>
					</div>
					{view[state]}
				</Paper>
			</Container>
		</>
	);
}

export default App;
