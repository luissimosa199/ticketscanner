const { JSDOM } = require("jsdom");
const axios = require("axios");

// SCAN ONE TICKET
const scanNewDiscoTicket = async (ticketData) => {
  console.log("Parser Reached...");

  try {
    const getData = async () => {
      const result = htmlToJavaScriptObject(ticketData);
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

      const addressElement = document.querySelector(
        ".company-header:nth-child(3)"
      );
      const address = addressElement.textContent
        .trim()
        .replace("Dom.Com. ", "");

        const emisionElement = Array.from(
          document.querySelectorAll("div")
        ).find((element) => element.textContent.includes("Emisión:"));
        const emisionText = emisionElement
          ? emisionElement.textContent.trim()
          : null;
        const date = emisionText ? emisionText.split(":")[1].trim() : null;
        

      return {
        ticketItems,
        totalAmount,
        logoLink,
        address,
        date
      };
    }

    const ticket = await getData();
    return ticket;
  } catch (error) {
    console.log(error);
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  scanNewDiscoTicket,
};
