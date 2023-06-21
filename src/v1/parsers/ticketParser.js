const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");

// SCAN ONE BILL
const scanNewDiscoTicket = async (ticketUrl) => {
  const url = ticketUrl;

  try {
    const getData = async () => {
      const response = await fetch(url, {
        method: "GET",
      });

      const data = await response.text();

      const result = htmlToJavaScriptObject(data);
      return result;
    };

    function parseNumberString(numberString) {
      const cleanedString = numberString.replace(/[^0-9,-]+/g, "");
      const parsedNumber = parseFloat(
        cleanedString.replace(",", ".").replace(/,/g, "")
      );
      return parsedNumber || 0;
    }

    function htmlToJavaScriptObject(htmlString) {
      const dom = new JSDOM(htmlString);
      const document = dom.window.document;

      const element = document.querySelector(".table-full");
      const articles = element.querySelectorAll(".table-full-alt");

      const ticketItems = Array.from(articles).map((e) => {
        const name = e.querySelector("td>div:nth-child(1)").textContent.trim();

        const quantity = parseFloat(
          e
            .querySelector("td:nth-child(2)>div:nth-child(1)")
            .textContent.trim()
            .replace(/,/g, ".")
        );

        const price = parseFloat(
          e
            .querySelector("td:nth-child(3)>div:nth-child(1)")
            .textContent.trim()
            .replace(/[^0-9.,]+/g, "")
            .replace(".", "")
            .replace(",", ".")
        );

        const total = parseFloat(
          e
            .querySelector("td:nth-child(4)>div:nth-child(1)")
            .textContent.trim()
            .replace(/[^0-9.,]+/g, "")
            .replace(".", "")
            .replace(",", ".")
        );

        return { name, quantity, price, total };
      });

      const totalAmountString = document
        .querySelector("td.total-import.right.bold")
        .textContent.trim();
      const totalAmount = parseNumberString(totalAmountString);
      const logoLink = document.querySelector("img").src;

      return { ticketItems, totalAmount, logoLink };
    }

    const ticket = await getData();
    return ticket;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  scanNewDiscoTicket,
};