function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/Photographers-ID-Photos/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement( 'article' );
        article.setAttribute("aria-label", `Article : Profil de ${name}`)

        const idP = document.createElement( 'p' );
        idP.textContent = id;

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `Photo de profil de ${name}.`)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("aria-label", `Titre : ${name}`)

        const h3 = document.createElement( 'h3' );
        h3.textContent = `${city}, ${country}`;
        h3.setAttribute("aria-label", `Titre : ${city}, ${country}`)

        const pTagline = document.createElement( 'p' );
        pTagline.textContent = tagline;
        pTagline.setAttribute("aria-label", `Paragraphe : Slogant de ${name} "${tagline}"`)

        const spanPrice = document.createElement( 'span' );
        spanPrice.textContent = `${price}€/Jour`;
        spanPrice.setAttribute("aria-label", `Prix : ${price}/Jour`)

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(pTagline)
        article.appendChild(spanPrice)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}