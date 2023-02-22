const urlParams = new URLSearchParams(window.location.search);
const photographeId = urlParams.get("id");
export { photographeId };
console.log(photographeId);

async function getPhotographer(photographeId) {
  const response = await fetch("../data/photographers.json");
  if (!response.ok) {
    console.log("pas de reponse");
  }
  const photographersJson = await response.json();
  const photographer = photographersJson.photographers.find(
    (photographer) => photographer.id == photographeId
  );
  console.log(photographer);

  return photographer;
}

async function displayData(photographer) {
  const photographersSection = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);
  const userCardDOM = photographerModel.getUserCardTxTDOM();
  photographersSection.appendChild(userCardDOM);
  const userImgCardDOM = photographerModel.getUserCardImgDOM();
  photographersSection.appendChild(userImgCardDOM);
}

async function init() {
  try {
    // Récupère les datas des photographes
    const photographer = await getPhotographer(photographeId);
    displayData(photographer);
  } catch (error) {
    console.error(error);
  }
}

init();
