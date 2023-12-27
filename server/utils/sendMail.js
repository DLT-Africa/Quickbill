const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const Mailgen = require("mailgen");

let config = {
	service: "hotmail",
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
					link: `http://localhost:3000/auth/activate-account/${token}`,
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
		subject: "Welcome to QuickBill",
		html: mail,
	};
	transporter
		.sendMail(message)
		.then(() => {
			return res
				.status(200)
				.send({
					msg: "You should receive an email from us soon. If not, check your spam folder. Click on confirmation link to activate account",
					userEmail,
					name,
					token,
					// tokenExpiryDate
				});
		})
		.catch((error) => {
			console.log(error);
			return res
				.status(500)
				.send({ msg: "An error occured while sending the email." });
		});
};

module.exports = { sendConfirmationMail };
