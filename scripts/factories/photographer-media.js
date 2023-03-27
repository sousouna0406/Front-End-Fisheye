function mediaFactory(data) {
  const { date, id, likes, photographerId, price, title, image, video, name } =
    data;
  console.log(name);
  const mediaPath = `assets/images/${photographerId}/`;
  const mediaUrl = `${mediaPath}${video || image}`;
  const isVideo = Boolean(video);

  function getUserMediaCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("aria-label", `Photo de profil de ${name} `);

    const mediaElement = isVideo
      ? document.createElement("video")
      : document.createElement("img");
    mediaElement.setAttribute("src", mediaUrl);
    mediaElement.setAttribute("alt", isVideo ? `Video` : `Photo`);
    mediaElement.classList.add("lightbox-trigger");
    if (isVideo) {
      mediaElement.allowfullscreen = true;
    }

    const titre = document.createElement("h3");
    titre.textContent = title;
    titre.setAttribute("aria-label", "titre");

    const like = document.createElement("span");
    like.textContent = likes;
    like.setAttribute("aria-label", "like");

    article.appendChild(mediaElement);
    article.appendChild(titre);

    return article;
  }
  function encart() {
    const divEncart = document.createElement("div");
    divEncart.setAttribute("aria-label", `div : Profil de ${name}`);

    const spanEncart = document.createElement("span");
    spanEncart.textContent = `${price}€ / Jour`;
    spanEncart.setAttribute("aria-label", `Prix : ${price}€/Jour`);

    divEncart.appendChild(spanEncart);

    return divEncart;
  }

  return { mediaUrl, getUserMediaCardDOM, encart };
}
