import { atom } from "recoil";

const tokenAtom = atom({
    key: "tokenAtom",
    default: JSON.parse(localStorage.getItem("token"))
})

export default tokenAtom; 