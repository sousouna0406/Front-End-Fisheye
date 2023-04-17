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
  totalLikesElement.setAttribute("tabindex", "0");

  // eslint-disable-next-line no-undef
  main.appendChild(totalLikesElement);
  console.log(photographer.media);
  // Fonction pour trier les médias

  function getSortedMediaArray(selectedValue, mediaArray) {
    let sortedMediaArray;

    switch (selectedValue) {
      case "popularity":
        // eslint-disable-next-line no-undef
        sortedMediaArray = sortMedia("popularity", mediaArray);
        break;
      case "date":
        // eslint-disable-next-line no-undef
        sortedMediaArray = sortMedia("date", mediaArray);
        break;
      case "title":
        // eslint-disable-next-line no-undef
        sortedMediaArray = sortMedia("title", mediaArray);
        break;
      default:
        console.error("Invalid sort criteria");
        return;
    }

    photographersSection.innerHTML = ""; // Efface tous les enfants existants

    // Créer les éléments DOM et les ajouter à la page
    sortedMediaArray.forEach((media) => {
      // eslint-disable-next-line no-undef
      const photographerModel = mediaFactory(media);
      const userCardDOM = photographerModel.getUserMediaCardDOM();
      photographersSection.appendChild(userCardDOM);
    });

    // Itération sur chaque élément de prix du photographe
    photographer.photographer.forEach((price) => {
      console.log(price);
      // eslint-disable-next-line no-undef
      const encartModel = mediaFactory(price);
      const encartCardDOM = encartModel.encart();
      photographersSection.appendChild(encartCardDOM);
    });

    return sortedMediaArray;
  }
  const menu = document.getElementById("sort-select-ul");

  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      const selectedValue = event.target.getAttribute("data-value");
      const sortedMediaArray = getSortedMediaArray(
        selectedValue,
        photographer.media
      );
      console.log("Médias triés : ", sortedMediaArray);
    }
  });
  // Créer les éléments DOM et les ajouter à la page
  photographer.media.forEach((media) => {
    // eslint-disable-next-line no-undef
    const photographerModel = mediaFactory(media);
    const userCardDOM = photographerModel.getUserMediaCardDOM();
    photographersSection.appendChild(userCardDOM);
  });

  // Itération sur chaque élément de prix du photographe
  photographer.photographer.forEach((price) => {
    console.log(price);
    // eslint-disable-next-line no-undef
    const encartModel = mediaFactory(price);
    const encartCardDOM = encartModel.encart();
    photographersSection.appendChild(encartCardDOM);
  });
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
