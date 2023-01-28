// make call
// show punchline
// reset
// https://media.tenor.com/QW5MWVFFC3kAAAAM/lolol.gif

const jokeBtn = document.querySelector(".joke-btn");
const resetBtn = document.querySelector(".reset-btn");
const punchlineBtn = document.querySelector(".punchline-btn");
const spinner = document.querySelector(".spinner-wrapper");
const jokeText = document.querySelector(".joke-text");
const punchLine = document.querySelector(".punchline-text");
const toastTrigger = document.getElementById("liveToastBtn");
const toastLiveExample = document.getElementById("liveToast");
const toastContainer = document.querySelector(".toast-container");
const punchLineWrapper = document.querySelector(".punchline-wrapper");
const img = document.querySelector(".img");
const resetWrapper = document.querySelector(".reset");
const tellJoke = document.querySelector(".tell-joke");
const promptWrapper = document.querySelector(".prompt-wrapper");

let joke = {};

// fetch api
const tellAJoke = async () => {
  try {
    jokeBtn.innerText = "hold on..";
    spinner.style.display = "flex";
    const result = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );

    const data = await result.json();
    spinner.style.display = "none";
    tellJoke.style.display = "none";
    jokeText.innerHTML = data.setup;
    punchLineWrapper.style.display = "flex";

    joke = data;
  } catch (error) {
    console.log({ error });
    document.querySelector(".toast-body").innerText = `${error}`;
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  }
};

jokeBtn.addEventListener("click", tellAJoke);

const showPunchLine = () => {
  jokeText.innerHTML = "";
  spinner.style.display = "flex";
  setTimeout(() => {
    spinner.style.display = "none";
    punchLine.innerHTML = joke.punchline;
  }, 500);

  setTimeout(() => {
    img.src =
      "https://i.pinimg.com/originals/8a/2c/94/8a2c949b7917b5caafd7a150dc555b3a.gif";
    promptWrapper.style.display = "block";
  }, 1000);
  punchLineWrapper.style.display = "none";

  // document.querySelector(".reset").style.display = "flex";
};

punchlineBtn.addEventListener("click", showPunchLine);

const reset = () => {
  joke = {};
  punchLine.innerHTML = "";
  jokeText.innerHTML = "";

  img.src =
    "https://pic.chinesefontdesign.com/uploads/2017/09/chinesefontdesign.com-2017-09-10_06-23-22_597945.gif";
  promptWrapper.style.display = "none";
  tellJoke.style.display = "block";
  jokeBtn.innerText = "tell me a joke";
};

resetBtn.addEventListener("click", reset);
