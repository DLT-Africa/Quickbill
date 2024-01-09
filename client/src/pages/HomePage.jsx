import NavBar from "../components/NavBar";
import HeroSec from "../components/homepage/HeroSec";
import { Box } from "@chakra-ui/react";
import PayrollCon from "../components/homepage/PayrollCon";
import Container from "../components/homepage/Container";
import Faq from "../components/homepage/Faq";
import Footer from "../components/Footer";

const HomePage = () => {
	return (
		<Box bg={"#eeeeee"}>
			<NavBar position={"sticky"} zIndex={9999} top={0} />
			<HeroSec />
			<PayrollCon />
			<Container />
			<Faq />
			<Footer />
		</Box>
	);
};

export default HomePage;
