import { atom } from "recoil";

const invoiceAtom = atom({
    key: "invoiceAtom",
    default: {
        invoiceNumber: '',
        client: '',
        items: [],
        issueDate: '',
        dueDate: '',
        subTotalBeforeDiscount: '',
        totalDiscountValue: '',
        vatPercent: '',
        vatValue: '',
        grandTotal: '',
        notes: '',
        currency: '',
        remainingAmount: '',
    }
})

export default invoiceAtom; 