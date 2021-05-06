
import {$_GET, recuperationQuantite, clearProductPanier, retraitDuPanier, ajoutPanier, recuperationPanierArray, AffichagePastille} from './functions.js';
const listeArticlePanier = document.querySelector(".liste_articles_panier");

document.addEventListener("DOMContentLoaded", () => {
    // let totauxDesPrix = [];
    let totauxDesPrix = new Object;
    let listeDesPrix = new Object;
    let prixTotal = 0;
    
    if (listeArticlePanier) {
      fetch("http://localhost:3000/api/teddies")
      .then((res) => res.json()) // conversion JSON
      .then((data) => {
          data.forEach((article) => {
            let nombreourspanier = recuperationQuantite(article._id);
              if (nombreourspanier > 0){
                // calcul du prix
                listeDesPrix[article._id] = article.price;
                let prixCalcule = article.price * nombreourspanier;
                prixTotal += prixCalcule;
                totauxDesPrix[article._id] = prixCalcule
    
                  let article_ours = `
                    <article class="article_panier max_width_container" id="${article._id}">
                    <h2>${article.name}</h2>
                    <div class="bordure_panier">
                         
                    </div>
                    <div class="renseignements_panier">
                        <div class="renseignement_texte">
                            Quantité commandée : ${nombreourspanier}, prix total : ${prixCalcule /100},${prixCalcule %100} €.
                        </div>
                        <button class="bouton_increment_panier">
                            Ajouter au panier.
                        </button>
                        <button class="bouton_decrement_panier">
                            retirer un du panier.
                        </button>
                        <button class="bouton_delete_panier">
                            retirer tous du panier.
                        </button>
                    </div>
                    <div class="bordure_panier">
                         
                    </div>
                        <div class="photo_produit_panier">
                        <a href="../../pages/product/?id=${article._id}">
                            <img src="${article.imageUrl}" alt="Photo ours en peluche" class="produit_ours_panier"/>
                        </a>
                        </div>
                    </article>`;
                listeArticlePanier.innerHTML += (article_ours);
              }
          });
      })
      .then((total) => {
        listeArticlePanier.innerHTML += 
        `<article class="article_panier max_width_container">
        <h2 id="titre_total">Total du panier : </h2>
        <div class="renseignements_panier">
            <div id="renseignement_total">
                ${prixTotal /100},${prixTotal %100} €.
            </div>
            <button class="bouton_commander">
                Finaliser la commande.
            </button>
        </div>
        </article>`;
    

              let btnAjout = document.getElementsByClassName('bouton_increment_panier');
              let btnminus = document.getElementsByClassName('bouton_decrement_panier');
              let btndelete = document.getElementsByClassName('bouton_delete_panier');
              let totaux = document.getElementById('renseignement_total');
          
              for (let item of btnAjout) { // pour chaque noeud de ma classe bouton
                  item.addEventListener('click', function(){ajoutPanier(item.parentNode.parentNode.id)});
                  item.addEventListener('click', function(){modificationPrix(item.parentNode.parentNode.id, "+")});
                  item.addEventListener('click', function(){item.previousElementSibling.innerHTML = `Quantité commandée : 
                  ${recuperationQuantite(item.parentNode.parentNode.id)}, prix total : 
                  ${totauxDesPrix[item.parentNode.parentNode.id] /100},${totauxDesPrix[item.parentNode.parentNode.id] %100} €.`}); // marche
                  item.addEventListener('click', function(){prixTotal += listeDesPrix[item.parentNode.parentNode.id]});
                  item.addEventListener('click', function(){totaux.innerHTML = (prixTotal /100 + "," + prixTotal %100 + " €")});
              }
              for (let item of btnminus) { // pour chaque noeud de ma classe bouton
                  item.addEventListener('click', function(){retraitDuPanier(item.parentNode.parentNode.id)});
                  item.addEventListener('click', function(){modificationPrix(item.parentNode.parentNode.id, "-")});
                  item.addEventListener('click', function(){item.previousElementSibling.previousElementSibling.innerHTML = `Quantité commandée : 
                  ${recuperationQuantite(item.parentNode.parentNode.id)}, prix total :
                  ${totauxDesPrix[item.parentNode.parentNode.id] /100},${totauxDesPrix[item.parentNode.parentNode.id] %100} €.`}); // marche
                  item.addEventListener('click', function(){totaux.innerHTML = (prixTotal /100 + "," + prixTotal %100 + " €")});
              }
              for (let item of btndelete) { // pour chaque noeud de ma classe bouton
                  item.addEventListener('click', function(){modificationPrix(item.parentNode.parentNode.id, "--")});
                  item.addEventListener('click', function(){clearProductPanier(item.parentNode.parentNode.id)});
                  item.addEventListener('click', function(){item.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML = `Quantité commandée : ${recuperationQuantite(item.parentNode.parentNode.id)}.`}); // marche
                  item.addEventListener('click', function(){totaux.innerHTML = (prixTotal /100 + "," + prixTotal %100 + " €")});
              }
              AffichagePastille(); // On affiche la pastille une première fois, et ensuite on observe les changements

            // Selectionne le noeud dont les mutations seront observées
            let targetNode = document.getElementById('observer');
            // Options de l'observateur (quelles sont les mutations à observer)
            let config = { attributes: true, childList: true, subtree: true };
            // Créé une instance de l'observateur lié à la fonction de callback
            let observer = new MutationObserver(AffichagePastille);
            // Commence à observer le noeud cible pour les mutations précédemment configurées
            observer.observe(targetNode, config);
            // L'observation peut être arrêtée par la suite
            // observer.disconnect();
    
      });
    }
    
    function modificationPrix(id, operation) {
        if (operation == "+") {
            totauxDesPrix[id] += listeDesPrix[id];
        }
        else if (operation == "-") {
            if ((totauxDesPrix[id] - listeDesPrix[id]) < 0) {
                console.log("retrait impossible, panier negatif");
            }
            else {
                totauxDesPrix[id] -= listeDesPrix[id];
                prixTotal -= listeDesPrix[id];
            }
        }else if (operation == "--") {
            if ((prixTotal - (listeDesPrix[id] * recuperationQuantite(id))) < 0) {
                console.log("retrait impossible, panier negatif");
            }
            else {
                totauxDesPrix[id] -= (listeDesPrix[id] * recuperationQuantite(id));
                prixTotal -= (listeDesPrix[id] * recuperationQuantite(id));
            }
        } else {
            console.log("Error operation");
        }
    }




})