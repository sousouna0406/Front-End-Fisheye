console.log("ici");
import { photographeId } from "../pages/photographer.js";
console.log(photographeId);

async function getMedia(photographeId) {
  const response = await fetch("../data/photographers.json");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données.");
  }
  const photographersJson = await response.json();
  console.log(photographersJson);
  const photographer = photographersJson.photographers.filter(
    (photographers) => photographers.id == photographeId
  );
  console.log(photographer);
  const media = photographersJson.media.filter(
    (media) => media.photographerId == photographeId
  );
  console.log(media);
  return { media, photographer };
}

async function displayData(photographer) {
  const photographersSection = document.querySelector(".medias");
  console.log(photographer);

  let likesArray = [];

  for (let i = 0; i < photographer.media.length; i++) {
    const mediaLikes = photographer.media[i].likes;
    likesArray.push(mediaLikes);
  }

  let totalLikes = likesArray.reduce((acc, cur) => acc + cur, 0);

  const totalLikesElement = document.createElement("p");
  totalLikesElement.classList.add("total-likes");
  totalLikesElement.textContent = `${totalLikes} `;
  totalLikesElement.innerHTML += `<i class="fa-solid fa-heart"></i>`;

  main.appendChild(totalLikesElement);
  console.log(photographer.media);

  function sortMedia(criteria, mediaArray) {
    switch (criteria) {
      case "popularity":
        mediaArray.sort((a, b) => b.likes - a.likes); // Tri par popularité décroissante
        break;
      case "date":
        mediaArray.sort((a, b) => new Date(a.date) - new Date(b.date)); // Tri par date croissante
        break;
      case "title":
        mediaArray.sort((a, b) => a.title.localeCompare(b.title)); // Tri par titre croissant
        break;
      default:
        console.error("Invalid sort criteria");
        return;
    }

    return mediaArray;
  }

  const sortDropdown = document.createElement("select");
  sortDropdown.id = "sort-select";

  const popularityOption = document.createElement("option");
  popularityOption.text = "Popularité";
  popularityOption.value = "popularity";
  sortDropdown.add(popularityOption);

  const dateOption = document.createElement("option");
  dateOption.text = "Date";
  dateOption.value = "date";
  sortDropdown.add(dateOption);

  const titleOption = document.createElement("option");
  titleOption.text = "Titre";
  titleOption.value = "title";
  sortDropdown.add(titleOption);

  function getSortedMediaArray(selectedValue, mediaArray) {
    let sortedMediaArray;

    if (
      selectedValue === "popularity" ||
      selectedValue === "date" ||
      selectedValue === "title"
    ) {
      sortedMediaArray = sortMedia(selectedValue, mediaArray, photographer);
    }

    photographersSection.innerHTML = ""; // Efface tous les enfants existants du <main>

    // Créer les éléments DOM et les ajouter à la page
    sortedMediaArray.forEach((media) => {
      const photographerModel = mediaFactory(media);
      const userCardDOM = photographerModel.getUserMediaCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
    photographer.photographer.forEach((price) => {
      console.log(price);
      const encartModel = mediaFactory(price);
      const encartCardDOM = encartModel.encart();
      photographersSection.appendChild(encartCardDOM);
    });

    return sortedMediaArray;
  }
  photographer.media.forEach((media) => {
    console.log(media);
    const photographerModel = mediaFactory(media);
    const userCardDOM = photographerModel.getUserMediaCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
  photographer.photographer.forEach((price) => {
    console.log(price);
    const encartModel = mediaFactory(price);
    const encartCardDOM = encartModel.encart();
    photographersSection.appendChild(encartCardDOM);
  });

  sortDropdown.value = "popularity";
  const sortedMediaArray = getSortedMediaArray(
    "popularity",
    photographer.media
  );

  sortDropdown.addEventListener("change", () => {
    const selectedValue = sortDropdown.value;
    const sortedMediaArray = getSortedMediaArray(
      selectedValue,
      photographer.media
    );
    console.log("Médias triés : ", sortedMediaArray);
  });

  console.log("Médias triés : ", sortedMediaArray);
  main.appendChild(sortDropdown);
}

async function init() {
  try {
    // Récupère les datas des photographes
    const photographer = await getMedia(photographeId);
    displayData(photographer);
  } catch (error) {
    console.error(error);
  }
}

init();
