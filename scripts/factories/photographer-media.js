/*function getName() {
  const response = fetch("../data/photographers.json");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données.");
  }
  const photographersJson = response.json();
  console.log(photographersJson);
  const nameArray = photographersJson.photographers.find(
    (photographers) => photographers.name
  );
  console.log(nameArray.name);
  const name = nameArray.name;
  console.log(name);
  return name;
  getName();
}*/

function mediaFactory(data) {
  const { date, id, likes, photographerId, price, title, image, video, name } =
    data;

  const picture = `assets/images/${image}`;
  const videoMedia = `assets/images/${video}`;
  function getUserMediaCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("aria-label", `Article `);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de profil de ${name}.`);

    article.appendChild(img);

    return article;
  }
  return { picture, videoMedia, getUserMediaCardDOM };
}
