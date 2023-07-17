import { photographeId } from "../pages/photographer.js";

// Fonction recupération de donnée d'un photographe grâce a son id et aussi les medias associé a lui
async function getMedia(photographeId) {
  const response = await fetch("../data/photographers.json");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données.");
  }
  const photographersJson = await response.json();

  const photographer = photographersJson.photographers.filter(
    (photographers) => photographers.id == photographeId
  );

  const media = photographersJson.media.filter(
    (media) => media.photographerId == photographeId
  );

  return { media, photographer };
}

// Fonction affichage des differentes données d'un photographe
async function displayData(photographer) {
  const photographersSection = document.querySelector(".medias");

  /* CALCUL ET AFFICHAGE DU NOMBRE DES LIKES */

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

  /* SYSTEME DE TRI ET AFFICHAGE DES MEDIAS */

  // Fonction qui tri le tableau des medias en fonction des likes, des dates et des titres
  function sortMedia(sortCriteria, mediaArray) {
    switch (sortCriteria) {
      case "popularity":
        mediaArray.sort((a, b) => b.likes - a.likes);
        break;
      case "date":
        mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "title":
        mediaArray.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        console.error("Critère de tri invalide:", sortCriteria);
        return false;
    }
    return mediaArray;
  }

  // Fonction qui utilise un switch pour trier le tableau de médias en fonction du critère sélectionné (date, titre, likes)
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
        console.error("Critère de tri invalide");
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
      // eslint-disable-next-line no-undef
      const encartModel = mediaFactory(price);
      const encartCardDOM = encartModel.encart();
      photographersSection.appendChild(encartCardDOM);
    });

    return sortedMediaArray;
  }

  const menu = document.getElementById("sort-select-ul");

  // Gestionnaire d'événements au keydown sur menu pour detecter le critère de tri selectionner par l'utilisateur avec la touche enter et génère un élément DOM

  menu.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const focusedOption = document.activeElement;
      const selectedValue = focusedOption.getAttribute("data-value");

      if (selectedValue) {
        const sortedMediaArray = getSortedMediaArray(
          selectedValue,
          photographer.media
        );
        console.log("Médias triés :", sortedMediaArray);
      }
    }
  });

  // Gestionnaire d'événements au click sur  menu pour detecter le critère de tri selectionner par l'utilisateur et génère un élément DOM

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

  // Itèration sur chaque média du photographe et génère un élément DOM
  photographer.media.forEach((media) => {
    // eslint-disable-next-line no-undef
    const photographerModel = mediaFactory(media);
    const userCardDOM = photographerModel.getUserMediaCardDOM();
    photographersSection.appendChild(userCardDOM);
  });

  // Itération sur chaque élément de prix du photographe et génère un élément DOM (encart)
  photographer.photographer.forEach((price) => {
    // eslint-disable-next-line no-undef
    const encartModel = mediaFactory(price);
    const encartCardDOM = encartModel.encart();
    photographersSection.appendChild(encartCardDOM);
  });
}

// Fonction appel getMedia et displayData et verifie qu'il n'y a pas d'erreur
async function init() {
  try {
    const photographer = await getMedia(photographeId);
    displayData(photographer);
  } catch (error) {
    console.error(error);
  }
}

init();
