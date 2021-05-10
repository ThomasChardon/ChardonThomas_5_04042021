
import {$_GET, recuperationQuantite, clearProductPanier, retraitDuPanier, ajoutPanier, clearPanier, AffichagePastille} from './functions.js';
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
                            +
                        </button>
                        <button class="bouton_decrement_panier">
                            -
                        </button>
                        <button class="bouton_delete_panier">
                            X
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

          listeArticlePanier.innerHTML += 
          `<article class="max_width_container renseignement_finalisation">
          <div><h2 id="titre_total">Total du panier : <div id="renseignement_total">${prixTotal /100},${prixTotal %100} €.</div>  </h2></div>
          
          
          <div class="renseignements_panier">
              <div>
                  <form method="POST" id="mon_formulaire">
                  <p>
                  <label for="id_lastname">Votre nom</label>
                  <input type="text" name="Lastname" id="id_lastname"
                  maxlength="20" placeholder="Ex: Martin "/>
                  <br/>
                  <label for="id_firstname">Votre prénom</label>
                  <input type="text" name="Firstname" id="id_firstname"
                  maxlength="20" placeholder="Ex: Gabriel "/>
                  <br/>
                  <label for="email">Votre e-mail</label>
                  <input type="email" name="email" id="email"
                  maxlength="20" placeholder="johndoe@gmail.com"/>
                  <br/>
                  <label for="id_adress">Votre adresse</label>
                  <input type="text" name="Adress" id="id_adress"
                  maxlength="40" placeholder="1 rue Jules Vernes"/>
                  <br/>
                  <label for="id_city">Votre ville</label>
                  <input type="text" name="City" id="id_city"
                  maxlength="20" placeholder="Paris"/>
                  <br/>
                  <button class="bouton_commander">
                  Finaliser la commande.
                  </button>
                  </p>
                  </form>
              </div>
          </div>
          </article>`;

      })
      .then((total) => {

              let btnSuppressionTotale = document.getElementById('suppression_panier');
              btnSuppressionTotale.addEventListener('click', function(){clearPanier()});
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


              // validation des données
            //   myInput.addEventListener('input',function(e) {
            //     var value = e.target.value;
            //         if (value.startsWith('Hello ')) {
            //             isValid = true;
            //         } else {
            //             isValid = false;
            //         }
            //     });

            // function isValid(value) {
            //     return /^e[0-9]{3,}$/.test(value);
            // }

            // voir aussi pour le post
            //             var request = new XMLHttpRequest();
            // request.open("POST", "http://url-service-web.com/api/users");
            // request.setRequestHeader("Content-Type", "application/json");
            // request.send(JSON.stringify(jsonBody));

              //window.location pour redirection

            // POST
            // window.addEventListener("load", function () {
                // function sendData() {
                //   let XHR = new XMLHttpRequest();
              
                //   console.log(maNode);
                //   // Liez l'objet FormData et l'élément form
                //   let FD = new FormData(maNode);
                //   console.log(FD);
              
                // //   let data = JSON.stringify(maNode);
                //   console.log(data);
                  // Définissez ce qui se passe si la soumission s'est opérée avec succès
                //   XHR.addEventListener("load", function(event) {
                //     alert(event.target.responseText);
                //   });
              
                //   // Definissez ce qui se passe en cas d'erreur
                //   XHR.addEventListener("error", function(event) {
                //     alert('Oups! Quelque chose s\'est mal passé.');
                //   });
              
                //   // Configurez la requête
                //   XHR.open("POST", "http://localhost:3000/api/teddies/order");
              
                //   // Les données envoyées sont ce que l'utilisateur a mis dans le formulaire
                // //   XHR.send(FD);
                // }
              
                // Accédez à l'élément form …
                // let form = document.getElementById("mon_formulaire");
                // console.log(form);
              
                // … et prenez en charge l'événement submit.
                // form.addEventListener("submit", function (event) {
                //   event.preventDefault();
              
                //   sendData();
                  // penser à rajouter une action au formulaire (action="validationCart.js" ?)
                // });



                // Selectionne le noeud dont les mutations seront observées
                let maNode = document.getElementById('mon_formulaire');
            // Options de l'observateur (quelles sont les mutations à observer)
            // let config = { attributes: true, childList: true, subtree: true };
            // Créé une instance de l'observateur lié à la fonction de callback
            let monObserver = new MutationObserver(handleSubmit);
            // Commence à observer le noeud cible pour les mutations précédemment configurées
            monObserver.observe(maNode, config);

                function handleSubmit(event) {
                    event.preventDefault();
                    const data = new FormData(event.target);
                    // const data = new FormData(form);
                    console.log(data);
                    const value = data.get('email');
                    // console.log(value);
                    }
                    const form = document.querySelector('form');
                    // console.log(form);
                    form.addEventListener('submit', handleSubmit);


            //   });// fonction load
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