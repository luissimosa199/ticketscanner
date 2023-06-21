const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const v1TicketRouter = require("./v1/routes/ticketRoutes");

// cors
app.use(cors());
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());
// base urls
app.use("/api/v1/tickets", v1TicketRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
