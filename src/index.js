import express from "express";
import { app } from "express";
import cors from "cors";

const PORT = process.env.PORT || 5000;

const v1TicketRouter = require("./v1/routes/ticketRoutes");

// cors
app.use(cors('*'));
// headers
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.options('/api/v1/tickets/disco', (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.sendStatus(200);
// });

// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());
// base urls
app.use("/api/v1/tickets", v1TicketRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
