async function generateIdea() {
  const result = document.getElementById("result");
  const activity = document.getElementById("activity");
  const type = document.getElementById("type");
  const apiKey = "aVXFTLU+zUdVIjNbsPUgbw==VBGKLy8lwxRlOVjf";
  const screenshoot = document.getElementById("screenshoot");
  const plusButton = document.querySelector(".fab__icon");
  const iconElement = document.querySelector("ons-icon");
  let count = 0;

  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  const url = "https://api.api-ninjas.com/v1/quotes?category=success";
  const response = await fetch(url, options);

  const api = await response.json();

  activity.textContent = api[0].quote;
  type.textContent = api[0].author;

  type.style.display = "block";

  screenshoot.addEventListener("click", () => {
    count && location.reload();

    html2canvas(result).then((callback) => {
      screenshoot.setAttribute("href", callback.toDataURL("image/png"));
      screenshoot.setAttribute("download", "quotes.png");
      count = 1;
    });

    if (iconElement) {
      iconElement.setAttribute("icon", "md-download");
    }
  });

  plusButton.addEventListener("click", () => {
    screenshoot.removeAttribute("href");
    count = 0;

    if (iconElement) {
      iconElement.setAttribute("icon", "md-camera");
    }
  });
}
