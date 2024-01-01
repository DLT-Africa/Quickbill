import { atom } from "recoil";

const allEmployeesAtom = atom({
    key: "allEmployeesAtom",
    default: JSON.parse(localStorage.getItem("employees-quickBill"))
})

export default allEmployeesAtom; 