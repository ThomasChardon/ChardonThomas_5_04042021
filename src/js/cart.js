
import {$_GET, recuperationQuantite, ajoutPanier, retraitDuPanier} from './functions.js';
const listeArticlePanier = document.querySelector(".liste_articles_panier");

// let oursid = $_GET('id');
let oursid = "";

// let nombreourspanier = recuperationQuantite(oursid);

if (listeArticlePanier) {
    console.log(listeArticlePanier);
  fetch("http://localhost:3000/api/teddies")
  .then((res) => res.json()) // conversion JSON
  .then((data) => {
      data.forEach((article) => {
        let nombreourspanier = recuperationQuantite(article._id);
        console.log(article._id + " : id. nombre dans le panier : " + nombreourspanier);
          if (nombreourspanier > 0){
              oursid = article._id;
              let article_ours = document.createRange().createContextualFragment(`
                <article class="article_panier max_width_container">
                <h2>${article.name}</h2>
                <div class="bordure_panier">
                     
                </div>
                <div class="renseignements_panier">
                    Quantité commandée : ${nombreourspanier}.
                    <button class="bouton_increment_panier">
                        Ajouter au panier.
                    </button>
                    <button class="bouton_decrement_panier">
                        retirer un du panier.
                    </button>
                </div>
                <div class="bordure_panier">
                     
                </div>
                    <div class="photo_produit_panier">
                    <a href="../../pages/product/?id=${article._id}">
                        <img src="${article.imageUrl}" alt="Photo ours en peluche" class="produit_ours_panier"/>
                    </a>
                    </div>
                </article>`);
            listeArticlePanier.appendChild(article_ours);
          }
      });
  });
}

// reprendre ici les boutons ne fonctionnent pas

let btnAjout = document.getElementsByClassName('bouton_increment_panier');// mon id dans le HTML
console.log(btnAjout);
// btnAjout.addEventListener('click', function(){ajoutPanier(oursid)}); // action associée

let btnminus = document.getElementsByClassName('bouton_decrement_panier'); // mon id dans le HTML
// btnminus.addEventListener('click', function(){retraitDuPanier(oursid)}); // action associée