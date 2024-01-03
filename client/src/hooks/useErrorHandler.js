import { useRecoilState } from "recoil";
import { prevPathAtom } from "../atoms/prevPathAtom";
import useShowToast from "./useShowToast";
import useLogout from "./useLogout";

const useErrorHandler = () => {
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const showToast = useShowToast();
	const logout = useLogout();

	const errorHandler = (error) => {
		const errorData = error.response?.data;
		if (errorData?.error?.startsWith("Internal")) {
			console.log("Internal Server Error");
			showToast("Error", "Internal Server Error", "error");
		} else if (errorData?.error?.startsWith("jwt" || "Unauthorized")) {
			setPrevPath(window.location.pathname);
			logout();
		} else if (error?.response?.status === 401) {
			setPrevPath(window.location.pathname);
			logout();
		}
	};
	return errorHandler;
};

export default useErrorHandler;
