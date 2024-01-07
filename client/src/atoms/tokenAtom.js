import { atom } from "recoil";

const tokenAtom = atom({
    key: "tokenAtom",
    default: localStorage.getItem("token")
})

export default tokenAtom; 