const express = require("express");
const api = express();
const mongoose = require("mongoose");

require("dotenv").config();
const cors = require("cors");

// const corsOptions = {
//   origin: "https://budget-tracking-app-rho.vercel.app",
//   optionsSuccessStatus: 200,
// };
// api.use(cors(corsOptions));

api.use(cors());
api.options("*", cors());

const connectionString = process.env.MONGO_CONNECTION;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas")
);

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

const usersRoutes = require("./routes/users");
const categoriesRoutes = require("./routes/categories");
const recordsRoutes = require("./routes/records");

api.use("/users", usersRoutes);
api.use("/categories", categoriesRoutes);
api.use("/records", recordsRoutes);

// const port = 4000;
api.listen(process.env.PORT || 4000, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
