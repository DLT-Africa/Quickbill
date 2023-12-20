import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/theme-utils";

import { RecoilRoot } from "recoil";

const styles = {
	global: (props) => ({
		body: {
			color: mode("gray.800", "whiteAlpha: 900")(props),
			bg: mode("gray.100", "#101010")(props),
		},
	}),
};

const config = {
	initialColorMode: "light",
	useSystemColorMode: true,
};

const colors = {
	gray: {
		light: "#616161",
		dark: "#1e1e1e",
	},
};

const theme = extendTheme({ config, styles, colors });

ReactDOM.createRoot(document.getElementById("root")).render(

  <RecoilRoot>
<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<App />
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>
  </RecoilRoot>
);
