function mediaFactory(data) {
  const { date, id, likes, photographerId, price, title, image, video, name } =
    data;

  const mediaPath = `assets/images/${photographerId}/`;
  const mediaUrl = `${mediaPath}${video || image}`;
  const isVideo = Boolean(video);

  let likeCount = likes;
  let liked = false;

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
    console.log(likes);
    like.classList.add("heart-likes");
    like.textContent = likeCount + " ";
    like.innerHTML += '<i class="fa-regular fa-heart"></i>';
    like.addEventListener("click", () => {
      if (liked) {
        liked = false;
        likeCount--;
        like.textContent = likeCount + " ";
        like.innerHTML += '<i class="fa-regular fa-heart"></i>';
      } else {
        liked = true;
        likeCount++;
        like.textContent = likeCount + " ";
        like.innerHTML +=
          '<i class="fa-sharp fa-solid fa-heart" aria-hidden="true"></i>';
      }
    });

    article.appendChild(mediaElement);
    article.appendChild(titre);
    article.appendChild(like);

    return article;
  }

  function encart() {
    const divEncart = document.createElement("div");
    divEncart.classList.add("encart");
    divEncart.setAttribute("aria-label", `div : Profil de ${name}`);

    const spanEncart = document.createElement("span");
    spanEncart.textContent = `${price}€ / Jour`;
    spanEncart.setAttribute("aria-label", `Prix : ${price}€/Jour`);

    divEncart.appendChild(spanEncart);

    return divEncart;
  }

  return { mediaUrl, getUserMediaCardDOM, encart };
}
