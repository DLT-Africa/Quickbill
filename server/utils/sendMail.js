const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const Mailgen = require("mailgen");

let config = {
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
};

let transporter = nodemailer.createTransport(config);
let MailGenerator = new Mailgen({
	theme: "default",
	product: {
		name: "QuickBill",
		link: "https://google.com",
	},
});

//********************************************************************************************************************************** */

const sendConfirmationMail = ({ email: userEmail, name, token }, res) => {
	let response = {
		body: {
			name: name,
			intro: "Welcome to QuickBill! We're very excited to have you on board.",
			action: {
				instructions: "To get started with Quickbill, please click here:",
				button: {
					color: "#22BC66", // Optional action button color
					text: "Confirm your account",
					link: `http://localhost:5173/verify-access/${token}`,
				},
			},
			outro:
				"Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};

	let mail = MailGenerator.generate(response);
	let message = {
		from: process.env.EMAIL,
		to: userEmail,
		subject: `${name}, Welcome to QuickBill`,
		html: mail,
	};
	transporter
		.sendMail(message)
		.then(() => {
			return res.status(200).send({
				msg: "You should receive an email from us soon. If not, check your spam folder. Click on confirmation link to activate account",
			});
		})
		.catch((error) => {
			console.log(error);
			return res
				.status(500)
				.send({ error: "An error occured while sending activation email." });
		});
};

//******************************************************************************************** */

const sendClientInvitationMail = (
	{ inviterEmail, inviterName, clientEmail },
	res
) => {
	let response = {
		body: {
			intro: `${inviterName} with email address (${inviterEmail})  has invited you to Quickbill to enjoy seamless payroll and invoicing system`,
			action: {
				instructions:
					"To get started with Quickbill, please click on the button below to register in less than 3 minutes:",
				button: {
					color: "#22BC66", // Optional action button color
					text: "Accept Invitation",
					link: `http://localhost:5173/auth/`,
				},
			},
			outro:
				"Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};

	let mail = MailGenerator.generate(response);

	let message = {
		from: process.env.EMAIL,
		to: clientEmail,
		subject: `${inviterName} invited you to Quickbill`,
		html: mail,
	};

	transporter
		.sendMail(message)
		.then(() => {
			return res.status(200).send({
				message: "Invitation mail sent",
			});
		})
		.catch((error) => {
			console.log(error);
			return res
				.status(500)
				.send({ error: "An error occured while sending the email." });
		});
};

//************************************************************************************** */

const sendInvoiceMail = (newInvoice, invoiceOwner, res) => {
	const tableData = newInvoice.items.map((item) => ({
		Item: item.itemName,
		Qty: item.qty,
		"Unit Price": `${newInvoice.currency} ${item.price}`,
		"Discount(%)": item.discPercent,
		Amount: `${newInvoice.currency} ${item.amtAfterDiscount}`,
	}));

	let response = {
		body: {
			name: newInvoice.client.name,
			intro: [
				`${invoiceOwner.name} just sent you an invoice. Here is a brief overview of the invoice generated.`,
			],
			table: {
				data: tableData,
			},
			action: [
				{
					instructions: `You are expected to pay a sum of ${newInvoice.currency}${newInvoice.grandTotal} before the due date, kindly login to see more details about the invoice.`,
					button: {
						color: "#0175dd",
						text: "Take me to my account",
						link: "http://localhost:5173/auth/",
						fallback: true,
					},
				},
			],
			outro: [
				"If you have any problem, just reply to this email, we'd love to help.",
			],
		},
	};

	let mail = MailGenerator.generate(response);

	let message = {
		from: process.env.EMAIL,
		to: newInvoice.client.email,
		subject: `${invoiceOwner.name} sent you an invoice`,
		html: mail,
	};

	transporter
		.sendMail(message)
		.then(() => {
			return res.status(200).send({
				message: "Client notified successfully",
			});
		})
		.catch((error) => {
			console.log(error);
			return res
				.status(500)
				.send({ error: "An error occured while sending the email." });
		});
};

module.exports = {
	sendConfirmationMail,
	sendClientInvitationMail,
	sendInvoiceMail,
};
