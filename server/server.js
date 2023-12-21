const express = require ("express");
const dotenv =  require ("dotenv");
const mongoose = require ("mongoose");

dotenv.config();

const app = express();


const PORT = process.env.PORT || 3000;


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Is 🏃‍♂️ On PORT ${PORT}`));
  })
  .catch((err) => console.log(err));


