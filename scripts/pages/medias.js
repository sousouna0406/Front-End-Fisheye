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

  const media = photographersJson.media.filter(
    (media) => media.photographerId == photographeId
  );
  console.log(media);
  /*const videos = media.filter((media) => media.video);
  console.log(videos);*/
  return media;
}

async function displayData(photographer) {
  const photographersSection = document.querySelector(".medias");
  console.log(photographer);

  photographer.forEach((media) => {
    console.log(media);
    const photographerModel = mediaFactory(media);
    const userCardDOM = photographerModel.getUserMediaCardDOM();
    photographersSection.appendChild(userCardDOM);
    const encart = photographerModel.encart();
    photographersSection.appendChild(encart);
  });
  /* photographer.videos.forEach((video) => {
    console.log(video);
    const photographerModel = mediaFactory(video);
    const videoCardDOM = photographerModel.getUserMediaCardDOM();
    photographersSection.appendChild(videoCardDOM);
  });*/
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
