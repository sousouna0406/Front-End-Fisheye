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
  // Fonction pour trier les médias
  /*function sortMedia(criteria, mediaArray) {
    switch (criteria) {
      case "popularity":
        mediaArray.sort((a, b) => b.likes - a.likes); // Tri par popularité décroissante
        break;
      case "date":
        mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date)); // Tri par date décroissante
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

  // Récupérer les éléments du DOM
  const sortDropdown = document.getElementById("sort-select-ul");
  const popularityOption = document.getElementById("popularity-option");
  const dateOption = document.getElementById("date-option");
  const titleOption = document.getElementById("title-option");

  // Fonction pour trier et afficher les médias
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
  // Écouter les événements de changement sur la liste déroulante
  sortDropdown.addEventListener("click", (event) => {
    const selectedValue = event.target.value;
    const sortedMediaArray = getSortedMediaArray(
      selectedValue,
      photographer.media
    );
    console.log("Médias triés : ", sortedMediaArray);
  });

  function sortMedia(criteria, mediaArray) {
    switch (criteria) {
      case "popularity":
        mediaArray.sort((a, b) => b.likes - a.likes); // Tri par popularité décroissante
        break;
      case "date":
        mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date)); // Tri par date décroissante
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
  const localSortDropdown = document.querySelector(".nav");
  const sortDropdown = document.createElement("select");
  sortDropdown.id = "sort-select";

  localSortDropdown.appendChild(sortDropdown);

  const popularityOption = document.createElement("option");
  popularityOption.text = "Popularité";
  popularityOption.value = "popularity";
  popularityOption.classList.add("select-option");
  sortDropdown.appendChild(popularityOption);

  const dateOption = document.createElement("option");
  dateOption.text = "Date";
  dateOption.value = "date";
  dateOption.classList.add("select-option");
  sortDropdown.appendChild(dateOption);

  const titleOption = document.createElement("option");
  titleOption.text = "Titre";
  titleOption.value = "title";
  titleOption.classList.add("select-option");
  sortDropdown.appendChild(titleOption);

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
  main.appendChild(localSortDropdown);
*/
  function getSortedMediaArray(selectedValue, mediaArray) {
    let sortedMediaArray;

    switch (selectedValue) {
      case "popularity":
        sortedMediaArray = sortMedia("popularity", mediaArray);
        break;
      case "date":
        sortedMediaArray = sortMedia("date", mediaArray);
        break;
      case "title":
        sortedMediaArray = sortMedia("title", mediaArray);
        break;
      default:
        console.error("Invalid sort criteria");
        return;
    }

    photographersSection.innerHTML = ""; // Efface tous les enfants existants du <main>

    // Créer les éléments DOM et les ajouter à la page
    sortedMediaArray.forEach((media) => {
      const photographerModel = mediaFactory(media);
      const userCardDOM = photographerModel.getUserMediaCardDOM();
      photographersSection.appendChild(userCardDOM);
    });

    // Itération sur chaque élément de prix du photographe
    photographer.photographer.forEach((price) => {
      console.log(price);
      const encartModel = mediaFactory(price);
      const encartCardDOM = encartModel.encart();
      photographersSection.appendChild(encartCardDOM);
    });

    return sortedMediaArray;
  }

  document
    .getElementById("sort-select-ul")
    .addEventListener("click", (event) => {
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
    const photographerModel = mediaFactory(media);
    const userCardDOM = photographerModel.getUserMediaCardDOM();
    photographersSection.appendChild(userCardDOM);
  });

  // Itération sur chaque élément de prix du photographe
  photographer.photographer.forEach((price) => {
    console.log(price);
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
