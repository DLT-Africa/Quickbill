## Contributing

- Comment under an issue you want to be assigned to.
- Create a New branch from `staging` with your name and the feature you are working on. for example
  `yusufroqib/hero-section`.
- Make sure you do a rebase or pull before making your pull request back to `staging`.
- On your pull request, refrence the issue you worked on by mentioning the issue number or uurl you worked on.

  
Contributions to this repository can be made via pull requests on GitHub to the Staging Branch. When opening a PR, please tag
[@yusufroqib](https://github.com/yusufroqib).


#### Server

- Express
- Mongoose
- JWT (For authentication)
- bcryptjs (for data encryption)
- Nodemailer (for sending invoice via email)
- html-pdf (for generating invoice PDFs)


In the terminal
- cd server and create a .env file in the root directory of your server directory.
- Supply the following credentials

```
MONGO_URI = 
JWT_SECRET = 
SMTP_HOST = 
SMTP_PORT = 
SMTP_USER = 
SMTP_PASS = 

```

To start the server
```
$ cd server
$ npm install (to install server-side dependencies)
& npm run dev (to start the server)
```
