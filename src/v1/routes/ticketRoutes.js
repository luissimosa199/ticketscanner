const express = require("express");

const router = express.Router();

const { scanDiscoTicket } = require("../controllers/ticketController");

// ONE ROUTE FOR ANY SUPERMARKET
router.post("/disco", scanDiscoTicket);

// router.post("/coto", scanCotoTicket);
// router.post("/jumbo", scanJumboTicket);



module.exports = router;
