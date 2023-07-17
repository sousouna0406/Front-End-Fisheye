/* Factory qui crée des modèles de media et de l'encart */

// eslint-disable-next-line no-unused-vars
function mediaFactory(data) {
  const { likes, photographerId, price, title, image, video, name } = data;

  const mediaPath = `assets/images/${photographerId}/`;
  const mediaUrl = `${mediaPath}${video || image}`;
  const isVideo = Boolean(video);

  let likeCount = likes;
  let liked = false;

  // Fonction pour la création et l'affichage des images (ou vidéos), titres ainsi que des likes de la page photographer
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
    const titre = document.createElement("h3");
    titre.textContent = title;
    titre.setAttribute("aria-label", "titre");
    titre.setAttribute("tabindex", "0");

    const like = document.createElement("span");
    like.setAttribute("tabindex", "0");
    like.classList.add("heart-likes");
    like.textContent = likeCount + " ";
    like.innerHTML += '<i class="fa-regular fa-heart"></i>';

    // Gestion du clic sur le like
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

    // Gestion de la touche Enter sur le like
    like.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
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
      }
    });
    // Gestion du clic sur le média pour ouvrir la lightbox
    mediaElement.onclick = () => {
      // eslint-disable-next-line no-undef
      displayLightbox();
    };

    // Gestion de la touche Enter pour ouvrir la lightbox
    mediaElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        // eslint-disable-next-line no-undef
        displayLightbox();
      }
    });
    article.appendChild(mediaElement);
    article.appendChild(titre);
    article.appendChild(like);

    return article;
  }

  // Fonction pour la création et l'affichage de l'encart avec l'honoraires journalier du photographer
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
