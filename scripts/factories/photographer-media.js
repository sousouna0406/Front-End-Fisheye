// eslint-disable-next-line no-unused-vars
function mediaFactory(data) {
  const { likes, photographerId, price, title, image, video, name } = data;

  const mediaPath = `assets/images/${photographerId}/`;
  const mediaUrl = `${mediaPath}${video || image}`;
  const isVideo = Boolean(video);

  let likeCount = likes;
  let liked = false;

  function getUserMediaCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("aria-label", `Photo `);
    article.setAttribute("tabindex", "0");

    const mediaElement = isVideo
      ? document.createElement("video")
      : document.createElement("img");
    mediaElement.setAttribute("src", mediaUrl);
    mediaElement.setAttribute("alt", isVideo ? `Video` : `Photo`);
    mediaElement.setAttribute("tabindex", "0");
    mediaElement.classList.add("lightbox-trigger");
    if (isVideo) {
      mediaElement.allowfullscreen = true;
    }
    article.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        console.log("here");
      }
    });
    const titre = document.createElement("h3");
    titre.textContent = title;
    titre.setAttribute("aria-label", "titre");
    titre.setAttribute("tabindex", "0");

    const like = document.createElement("span");
    like.setAttribute("tabindex", "0");
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
    divEncart.setAttribute("tabindex", "0");

    divEncart.appendChild(spanEncart);

    return divEncart;
  }

  return { mediaUrl, getUserMediaCardDOM, encart };
}
