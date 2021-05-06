
import {AffichagePastille} from './functions.js';

document.addEventListener("DOMContentLoaded", () => {
    const listeArticle = document.querySelector(".liste_articles_accueil");
    
    if (listeArticle) {
        console.log(listeArticle);
      fetch("http://localhost:3000/api/teddies")
      .then((res) => res.json()) // conversion JSON
      .then((data) => {
          data.forEach((article) => {
              let article_ours = document.createRange().createContextualFragment(`
                <article class="article">
                    <a href="./pages/product/?id=${article._id}">
                        <div>
                            <img src="${article.imageUrl}" alt="Photo ours en peluche" class="produit_ours"/>
                        </div>
                        <h2>${article.name}</h2>
                    </a>
                </article>`);
            listeArticle.appendChild(article_ours);
          });
      });
      //On affiche la pastille qu'une fois parce qu'elle n'est pas destinée à changer sur cette page
      AffichagePastille();



    }

})