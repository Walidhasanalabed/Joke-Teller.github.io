const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disabled/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Our Jokes To Our VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "f6aaac63e4d44ca5b6a8380bd3f85a00",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes From Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-To-Speech
    tellMe(joke);
    // Disabled Button
    toggleButton();
  } catch (error) {
    console.log("Oops!", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
