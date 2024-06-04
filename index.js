import express from "express";
const app = express();
import MemberRoute from "./Routes/MemberRoute.js";
import TrainerRoute from "./Routes/TrainerRoute.js";

//----------------------------------------------------------------
// Middleware
app.use(express.json());

//----------------------------------------------------------------

app.use("/mem", MemberRoute);
app.use("/tra", TrainerRoute);

//----------------------------------------------------------------
// error handling
app.use("*", (req, res) => {
  res.send("error");
});
//----------------------------------------------------------------
app.listen(3000, () => console.log("server listening on 3000"));
