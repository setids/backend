const result = document.getElementById("result");
const quote = document.getElementById("quote");
const author = document.getElementById("author");

const speech = document.querySelector(".speech");
const copy = document.querySelector(".copy");
const screenshoot = document.getElementById("screenshoot");

const quoteBtn = document.querySelector("button");

const quoteArea = document.querySelector(".quote-area");

const apiKey = "aVXFTLU+zUdVIjNbsPUgbw==VBGKLy8lwxRlOVjf";
let count = 0;

synth = speechSynthesis;

async function generateIdea() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";

  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  // const url = "https://www.boredapi.com/api/activity";
  // const response = await fetch(url);

  const url = "https://api.api-ninjas.com/v1/quotes?category=success";
  const response = await fetch(url, options);

  const api = await response.json();

  // quote.textContent = api.activity;
  // author.textContent = api.type;

  quote.textContent = api[0].quote;
  author.textContent = api[0].author;

  quoteBtn.classList.remove("loading");
  quoteBtn.innerText = "New Quote";

  screenshoot.addEventListener("click", () => {
    count && location.reload();

    screenshoot.removeAttribute("class", "");
    screenshoot.setAttribute("class", "fas fa-download");

    speech.style.display = "none";
    copy.style.display = "none";
    screenshoot.style.display = "none";
    quoteBtn.style.display = "none";

    html2canvas(result).then((callback) => {
      screenshoot.setAttribute("href", callback.toDataURL("image/png"));
      screenshoot.setAttribute("download", "quote.png");
      count = 1;

      quoteBtn.style.display = "block";
      speech.style.display = "flex";
      copy.style.display = "flex";
      screenshoot.style.display = "flex";
    });
  });

  quoteBtn.addEventListener("click", () => {
    screenshoot.setAttribute("class", "fa fa-camera");
    screenshoot.removeAttribute("href");
    count = 0;
  });
}

speech.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(
      `${quote.innerText} by ${author.innerText}`
    );
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speech.classList.remove("active")
        : speech.classList.add("active");
    }, 10);
  }
});

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(quote.innerText);
});
