const Ticket = require("../parsers/ticketParser");

// CREATE ONE Ticket
const scanNewDiscoTicket = async (ticketData) => {

  try {
    const scannedTicket = await Ticket.scanNewDiscoTicket(ticketData);
    return scannedTicket;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    scanNewDiscoTicket,
};
