const urlParams = new URLSearchParams(window.location.search);
const photographeId = urlParams.get("id");
console.log(photographeId);
function OnePhotographerFactory(data) {
  if (data != photographeId) {
    console.log("KO");
  }
  async function getOnePhotographer() {
    const response = await fetch("../data/photographers.json");
    if (!response.ok) {
      console.log("pas de reponse");
    }
    const photographeJson = await response.json();
    console.log(photographeJson);
    return photographeJson;
  }
  getOnePhotographer();
}
OnePhotographerFactory(photographeId);
