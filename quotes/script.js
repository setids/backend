const quoteBtn = document.querySelector("button");
const copyBtn = document.querySelector(".copy");
const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".author");
const speech = document.querySelector(".speech");
synth = speechSynthesis;

async function generateIdea() {
  const result = document.getElementById("result");
  const quote = document.getElementById("quote");
  const author = document.getElementById("author");
  const apiKey = "aVXFTLU+zUdVIjNbsPUgbw==VBGKLy8lwxRlOVjf";
  const screenshoot = document.getElementById("screenshoot");
  const icon = document.querySelector("icon");
  let count = 0;

  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";

  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  const url = "https://api.api-ninjas.com/v1/quotes?category=success";
  const response = await fetch(url, options);

  const api = await response.json();

  quote.textContent = api[0].quote;
  author.textContent = api[0].author;

  quoteBtn.classList.remove("loading");
  quoteBtn.innerText = "New Quote";

  screenshoot.addEventListener("click", () => {
    count && location.reload();

    html2canvas(result).then((callback) => {
      screenshoot.setAttribute("href", callback.toDataURL("image/png"));
      screenshoot.setAttribute("download", "quote.png");
      count = 1;
    });
  });
}

speech.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speech.classList.remove("active")
        : speech.classList.add("active");
    }, 10);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});
