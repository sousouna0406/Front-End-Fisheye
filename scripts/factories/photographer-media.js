function mediaFactory(data) {
  const { date, id, likes, photographerId, price, title, image, video } = data;
  const mediaPath = `assets/images/${photographerId}/`;
  const mediaUrl = `${mediaPath}${video || image}`;
  const isVideo = Boolean(video);

  function getUserMediaCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("aria-label", `Article `);

    const mediaElement = isVideo
      ? document.createElement("video")
      : document.createElement("img");
    mediaElement.setAttribute("src", mediaUrl);
    mediaElement.setAttribute("alt", `Photo de profil de ${name}.`);

    if (isVideo) {
      mediaElement.setAttribute("controls", "");
    }

    const titre = document.createElement("h3");
    titre.textContent = title;
    titre.setAttribute("aria-label", "titre");

    const like = document.createElement("span");
    like.textContent = likes;
    like.setAttribute("aria-label", "like");

    article.appendChild(mediaElement);
    article.appendChild(titre);
    article.appendChild(like);

    return article;
  }

  return { mediaUrl, getUserMediaCardDOM };
}
