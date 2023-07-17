// Fonction de recupération des données des photographes
async function getPhotographers() {
  const response = await fetch("../data/photographers.json");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données.");
  }
  const photographersJson = await response.json();
  return photographersJson;
}

// Fonction qui itère sur chaque photographe et affiche les données récupérées
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Fonction appel getPhotographers et displayData et verifie qu'il n'y a pas d'erreur
async function init() {
  try {
    const { photographers } = await getPhotographers();
    displayData(photographers);
  } catch (error) {
    console.error(error);
  }
}

init();
