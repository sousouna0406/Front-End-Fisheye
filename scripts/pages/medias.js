console.log("ici");
import { photographeId } from "../pages/photographer.js";
console.log(photographeId);

async function getMedia(photographeId) {
  const response = await fetch("../data/photographers.json"); // ajuster le chemin d'accès
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
