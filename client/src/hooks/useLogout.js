import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import {axiosInstance} from "../../api/axios";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
	const setUser = useSetRecoilState(userAtom);
    const navigate = useNavigate();

	const logout = async () => {
		try {
			const response = await axiosInstance.post("/auth/logout");

			const data = response.data;

			console.log(data);
			
			localStorage.clear();


			setUser(null);
            navigate("/auth");
		} catch (error) {
			console.log(error);
		}
	};
	return logout;
};

export default useLogout;
