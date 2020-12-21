import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { useState } from "react";
import "../styles/globals.css";

function getTheme() {
	if (typeof Storage !== "undefined") {
		// can use window.localStorage, so use the set value if it exists
		if (localStorage.getItem("preferredTheme") === "dark") return "dark";
	}
	return "light";
}

function MyApp({ Component, pageProps }) {
	const [themeType, setThemeType] = useState(getTheme());
	const switchThemes = () => {
		const newTheme = themeType === "dark" ? "light" : "dark";
		setThemeType(newTheme);
		if (typeof Storage !== "undefined")
			window.localStorage.setItem("preferredTheme", newTheme);
	};
	return (
		<GeistProvider theme={{ type: themeType }}>
			<CssBaseline />
			<Component
				{...pageProps}
				themeToggle={switchThemes}
				currentTheme={themeType}
			/>
		</GeistProvider>
	);
}

export default MyApp
