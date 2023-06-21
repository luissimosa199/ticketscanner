const Ticket = require("../parsers/ticketParser");

// CREATE ONE Ticket
const scanNewDiscoTicket = async (ticketUrl) => {

  try {
    const scannedTicket = await Ticket.scanNewDiscoTicket(ticketUrl);
    return scannedTicket;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    scanNewDiscoTicket,
};
