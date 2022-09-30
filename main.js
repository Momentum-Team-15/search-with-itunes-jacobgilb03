let input = document.querySelector("#searchbar");
let form = document.querySelector("#music");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let rockOn = input.value;
  const URL = `https://proxy-itunes-api.glitch.me/search?term=${rockOn}&limit=12`;
  searchSongs(URL);
  input.value = "";
});

function searchSongs(URL) {
  fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })


    .then(function (iTunesData) {
      makeResults(iTunesData.results);
      if(iTunesData.results.length === 0) {
        alert('Please enter a song or artist.')
      }

    });
}

let searchResults = document.querySelector("#searchResults");

function makeResults(musicList) {
  searchResults.innerHTML = "";
  for (let music of musicList) {
    let resultsDiv = document.createElement("div");
    let cover = document.createElement("img");
    let title = document.createElement("p");
    let artist = document.createElement("h1");
    let pButton = document.createElement("audio");

    resultsDiv.classList.add("songContainer");
    title.classList.add("song-title");
    artist.classList.add("artistName");


    cover.src = `${music.artworkUrl100}`;
    artist.innerText = `${music.artistName}`;
    if(!music.trackName){
        title.innerText = ""
    } else {
        title.innerText = `${music.trackName}`;
    }
    pButton.src = `${music.previewUrl}`;
    pButton.controls = true;

    resultsDiv.appendChild(cover);
    resultsDiv.appendChild(artist);
    resultsDiv.appendChild(title);
    resultsDiv.appendChild(pButton);
    searchResults.appendChild(resultsDiv);
  }
}