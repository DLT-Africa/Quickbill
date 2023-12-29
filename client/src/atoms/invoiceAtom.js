import { atom } from "recoil";

const invoiceAtom = atom({
    key: "invoiceAtom",
    default: {
        invoiceNumber: '',
        client: '',
        items: '',
        issueDate: '',
        dueDate: '',
        vat: '',
        subTotal: '',
        total: '',
        notes: '',
        currency: '',
        totalAmount: '',
        remainingAmount: '',
    }
})

export default invoiceAtom; 