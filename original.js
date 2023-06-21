const { JSDOM } = require("jsdom");

const url = "https://mifactura.napse.global/mf/pq1rt7/Y2VuY29zdWRfMTU0XzYyXzZfMDE1NDA2MjAwNjUyMzA1MjYxNDI5";

function parseNumberString(numberString) {
  const cleanedString = numberString.replace(/[^0-9,-]+/g, "");
  const parsedNumber = parseFloat(cleanedString.replace(",", ".").replace(/,/g, ""));
  return parsedNumber || 0;
}

function htmlToJavaScriptObject(htmlString) {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  const element = document.querySelector(".table-full") 
  const articles = element.querySelectorAll(".table-full-alt")

  const ticketItems = Array.from(articles).map((e) => {

    const name = e.querySelector("td>div:nth-child(1)").textContent.trim();
    const quantity = parseFloat(e.querySelector("td:nth-child(2)>div:nth-child(1)").textContent.trim().replace(/,/g, ".")).toFixed(3);
    const price = parseFloat(e.querySelector("td:nth-child(3)>div:nth-child(1)").textContent.trim().replace(/[^0-9.,]+/g, "").replace(".", "").replace(',','.')).toFixed(2);
    const total = parseFloat(e.querySelector("td:nth-child(4)>div:nth-child(1)").textContent.trim().replace(/[^0-9.,]+/g, "").replace(".", "").replace(',','.')).toFixed(2);

    return { name, quantity, price, total };
  });

  const totalAmountString = document.querySelector("td.total-import.right.bold").textContent.trim();
  const totalAmount = parseNumberString(totalAmountString);
  const logoLink = document.querySelector("img").src;

  return { ticketItems, totalAmount, logoLink };
}

const getData = async () => {
  const response = await fetch(url, {
    method: "GET"
  });

  const data = await response.text();

  const result = htmlToJavaScriptObject(data);
  return result;
};

const handleData = async () => {
  const result = await getData();
  console.log(result);
};

handleData();
