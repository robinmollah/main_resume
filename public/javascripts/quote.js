let quotes = [
  {
    quote:
      "If You only do what you can, You will never be more than you are now.",
    author: "Master Shifu (Kungfu Panda)",
  },
  {
    quote: "If you are nothing without the suit then you shouldn't have it",
    author: "Tony Stark (Ironman)",
  },
  {
    quote: "Life is tough, but so am I.",
    author: "Nobody",
  },
  {
    quote:
      "I am not waiting for something to happen, I am making things happen.",
    author: "Nobody",
  },
  {
    quote: "Every man dies, but not every man really lives.",
    author: "Braveheart",
  },
];
let randomNumber = Math.floor(Math.random() * quotes.length);
let quote = quotes[randomNumber];
console.log(randomNumber, quote);
document.getElementById("quote").innerText = quote.quote;
document.getElementById("quote-author").innerText = " - " + quote.author;

// Background color of quotes
let palettes = document.getElementsByClassName("palette");
let quote_content = document.getElementById("quote-content");
for (let i = 0; i < palettes.length; i++) {
  palettes[i].addEventListener("click", () => {
    if (palettes[i].classList.value.indexOf("blue") !== -1) {
      quote_content.style.backgroundColor = "rgba(3,73,109,0.51)";
      quote_content.style.color = "#fff";
    }
    if (palettes[i].classList.value.indexOf("red") !== -1) {
      quote_content.style.backgroundColor = "#D0313182";
      quote_content.style.color = "#aaef93";
    }
    if (palettes[i].classList.value.indexOf("orange") !== -1) {
      quote_content.style.backgroundColor = "#E8C81382";
      quote_content.style.color = "#155500";
    }
    if (palettes[i].classList.value.indexOf("green") !== -1) {
      quote_content.style.backgroundColor = "#5BD03182";
      quote_content.style.color = "#155500";
    }
  });
}
