//Fetch data from Cats Facts API and render it
const getDataCatsFacts = async () => {
  renderLoadingStateCatsFacts();
  try {
    const response = await fetch("https://catfact.ninja/fact");
    if (!response.ok) {
      throw new Error("Failed to load data from cats facts API");
    }
    const data = await response.json();
    renderDataCatsFacts(data);
  } catch (error) {
    renderErrorStateCatsFacts(error);
  }
};

const renderLoadingStateCatsFacts = () => {
  const container = document.getElementById("data-container-cats");
  container.innerHTML = "";
  container.innerHTML = "<p>Loading...</p>";
};

const renderErrorStateCatsFacts = (error) => {
  const container = document.getElementById("data-container-cats");
  container.innerHTML = "";
  container.innerHTML = `<p>Failed to load data from cats facts API. Error name: ${error}</p>`;
  console.log(error);
};

const renderDataCatsFacts = (data) => {
  const container = document.getElementById("data-container-cats");
  container.innerHTML = "";

  const div = document.createElement("div");
  div.className = "data-item";
  div.innerHTML = `<p>${data.fact}</p>`;
  container.appendChild(div);
};

document
  .getElementById("fetch-button-cats")
  .addEventListener("click", getDataCatsFacts);

//Fetch data from the Activity API and render it
const getDataActivity = async () => {
  renderLoadingStateActivity();
  try {
    const response = await fetch("https://bored.api.lewagon.com/api/activity/");
    if (!response.ok) {
      throw new Error("Failed to load data from Activity API");
    }
    const data = await response.json();
    renderDataActivity(data);
  } catch (error) {
    renderErrorStateActivity(error);
  }
};

const renderLoadingStateActivity = () => {
  const container = document.getElementById("data-container-Activity");
  container.innerHTML = "";
  container.innerHTML = "<p>Loading...</p>";
};

const renderErrorStateActivity = (error) => {
  const container = document.getElementById("data-container-Activity");
  container.innerHTML = "";
  container.innerHTML = `<p>Failed to load data from Activity API. Error name: ${error}</p>`;
  console.log(error);
};

const renderDataActivity = (data) => {
  const container = document.getElementById("data-container-Activity");
  container.innerHTML = "";

  const div = document.createElement("div");
  div.className = "data-item";
  div.innerHTML = `<p>${data.activity}</p>`;
  container.appendChild(div);
};

document
  .getElementById("fetch-button-Activity")
  .addEventListener("click", getDataActivity);

//Fetch data from the Anime API and render it
document.addEventListener("DOMContentLoaded", () => {
  const animeNumber = document.getElementById("number");
  const animeStatus = document.getElementById("status");
  const animeType = document.getElementById("type");
  const animeForm = document.getElementById("anime-forms");

  const getDataAnime = async (event) => {
    event.preventDefault(); // Remember to prevent the form from being sent.
    renderLoadingStateAnime();
    try {
      const number = animeNumber.value; // Get the VALUE of the select
      const status = animeStatus.value;
      const type = animeType.value;

      const response = await fetch(
        `https://api.jikan.moe/v4/anime?limit=${number}&status=${status}&type=${type}`
      );
      if (!response.ok) {
        throw new Error("Failed to load data from Anime API");
      }
      const data = await response.json();
      renderDataAnime(data);
      console.log(data);
    } catch (error) {
      renderErrorStateAnime(error);
    }
  };

  const renderLoadingStateAnime = () => {
    const container = document.getElementById("data-container-anime");
    container.innerHTML = "<p>Loading...</p>";
  };

  const renderErrorStateAnime = (error) => {
    const container = document.getElementById("data-container-anime");
    container.innerHTML = `<p>Failed to load data from Anime API. Error: ${error.message}</p>`;
    console.error(error);
  };

  const renderDataAnime = (data) => {
    const container = document.getElementById("data-container-anime");
    container.innerHTML = "";

    if (data.data && data.data.length > 0) {
      data.data.forEach((anime) => {
        const div = document.createElement("div");
        div.className = "data-item";
        div.innerHTML = `
          <img src="${anime.images.webp.image_url}" alt="${anime.title}" />
          <p><strong>Title:</strong> ${anime.title}</p>
          <p><strong>Status:</strong> ${anime.status}</p>
          <p><strong>Type:</strong> ${anime.type}</p>
          <p><strong>Score:</strong> ${anime.score}</p>
        `;
        container.appendChild(div);
      });
    } else {
      container.innerHTML = "<p>No anime found.</p>";
    }
  };

  animeForm.addEventListener("submit", getDataAnime);
});
