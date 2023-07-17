const urlParams = new URLSearchParams(window.location.search);
const photographeId = urlParams.get("id");
export { photographeId };

// Fonction de recupération des données d'un photographe grâce a son ID
async function getPhotographer(photographeId) {
  const response = await fetch("../data/photographers.json");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données.");
  }
  const photographersJson = await response.json();
  const photographer = photographersJson.photographers.find(
    (photographer) => photographer.id == photographeId
  );
  return photographer;
}

// Affichage des informations textuelles et l'image du photographe
async function displayData(photographer) {
  const photographersSection = document.querySelector(".photograph-header");
  // eslint-disable-next-line no-undef
  const photographerModel = photographerFactory(photographer);
  const userCardDOM = photographerModel.getUserCardTxTDOM();
  photographersSection.appendChild(userCardDOM);
  const userImgCardDOM = photographerModel.getUserCardImgDOM();
  photographersSection.appendChild(userImgCardDOM);
}

// Fonction appel getPhotographer et displayData et verifie qu'il n'y a pas d'erreur
async function init() {
  try {
    const photographer = await getPhotographer(photographeId);
    displayData(photographer);
  } catch (error) {
    console.error(error);
  }
}

init();
