// Fonction pour gérer la navigation du focus dans la modale
function handleModalFocus(e) {
  const modal = document.getElementById("contact_modal");
  const focusableElements = modal.querySelectorAll(
    "input:not([disabled]), button:not([disabled]), textarea:not([disabled]), img:not([disabled])"
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  } else if (e.key === "Escape") {
    closeModal();
  }
}

// Fonction pour activer et afficher les différents éléments de la modale
// eslint-disable-next-line no-unused-vars
async function displayModal() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographeId = urlParams.get("id");
  const modal = document.getElementById("contact_modal");

  modal.style.display = "block";
  const main = document.getElementById("main");
  main.classList.add("blur");
  const header = document.querySelector("header");
  header.classList.add("blur");

  try {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find(
      (photographer) => photographer.id == photographeId
    );
    if (photographer) {
      // eslint-disable-next-line no-undef
      modalFactory(photographer);
      const focusableElements = modal.querySelectorAll(
        "input:not([disabled]), button:not([disabled]), textarea:not([disabled])"
      );
      const firstElement = focusableElements[0];

      modal.addEventListener("keydown", handleModalFocus);
      firstElement.focus();
    } else {
      console.error("Photographer not found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Fonction pour désactiver la modale
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  const main = document.getElementById("main");
  main.classList.remove("blur");
  const header = document.querySelector("header");
  header.classList.remove("blur");
  const form = modal.querySelector("form");
  form.reset();
}

// Ajout d'un gestionnaire d'événements pour le formulaire de contact pour que les valeurs des champs sont récupérées soit affichées dans la console
const form = document.getElementById("contact_modal").querySelector("form");
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("e-mail").value;
  const message = document.getElementById("textarea").value;
  console.log({
    firstName,
    lastName,
    email,
    message,
  });
});
