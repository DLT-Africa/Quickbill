import { atom } from "recoil";

const allClientsAtom = atom({
    key: "allClientsAtom",
    default: JSON.parse(localStorage.getItem("clients-quickBill"))
})

export default allClientsAtom; 