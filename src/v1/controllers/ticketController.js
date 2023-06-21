const ticketService = require("../services/ticketService");

// SCAN ONE BILL
const scanDiscoTicket = async (req, res) => {
  const { url } = req.body;

  //   validation
  if (typeof url !== "string") {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Controller did not passed the URL validation",
      },
    });
    return;
  }

  try {
    const scannedTicket = await ticketService.scanNewDiscoTicket(url);
    res.status(201).send({ status: "OK", data: scannedTicket });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  scanDiscoTicket,
};
