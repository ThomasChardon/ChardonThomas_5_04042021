
import {recuperationPanierArray, recuperationQuantite, clearProductPanier, retraitDuPanier, ajoutPanier, clearPanier, AffichagePastille} from './functions.js';
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
                        <div class="div_boutons">
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
          //Màj du prix du panier total
          const miseAPrix = document.getElementById('renseignement_total');
          miseAPrix.innerHTML = `${prixTotal /100},${prixTotal %100} €.`;
      })
      .then((total) => {

              let btnSuppressionTotale = document.getElementById('suppression_panier');
              btnSuppressionTotale.addEventListener('click', function(){clearPanier()});
              btnSuppressionTotale.addEventListener('click', function(){document.location.reload()});
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


      });
      let monFormulaire = document.getElementById('mon_formulaire');

      //validation des données 
      function isValid(value) {
            return /^[0-9A-Za-z@-\sàéèôç\/\'.]{1,40}$/.test(value);
        }

        function testFormulaire() {
            if (isValid(nom.value) && isValid(prenom.value) && isValid(adresse.value) && isValid(ville.value) && isValid(mail.value)) {
                monFormulaire.bouton_clic.disabled = false;
                console.log("OK");
            } else {
                monFormulaire.bouton_clic.disabled = true;
                console.log("invalide");
            }
        }

        let prenom = document.getElementById('id_firstname');
        let nom = document.getElementById('id_lastname');
        let adresse = document.getElementById('id_adress');
        let ville = document.getElementById('id_city');
        let mail = document.getElementById('email');
        prenom.addEventListener('input', function() {testFormulaire()});
        nom.addEventListener('input', function() {testFormulaire()});
        adresse.addEventListener('input', function() {testFormulaire()});
        ville.addEventListener('input', function() {testFormulaire()});
        mail.addEventListener('input', function() {testFormulaire()});
        

      //envoi des données
      monFormulaire.addEventListener("submit", function (event) { //clic formulaire
          event.preventDefault();

          let contact = new Object();
          let products = [];
          products = recuperationPanierArray();
          
          const inputs = monFormulaire.querySelectorAll("input");
          for (const items of inputs) {
              contact[items.name] = items.value;
            }
            const checkout = new Object();
            checkout.contact = contact;
            checkout.products = products;
            
            fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(checkout),
            })
            .then((res) => res.json())
            .then((data) => {
                let order_id = data.orderId;
                let firstName = data.contact.firstName;
                let lastName = data.contact.lastName;
                let address = data.contact.address;
                let city = data.contact.city;
                let email = data.contact.email;
                let totalours = recuperationPanierArray().length;
                
                let URL = "../../pages/confirmation/?Order_id=" + order_id + "&firstName=" + firstName + "&lastName=" + lastName
                + "&address=" + address + "&city=" + city + "&email=" + email + "&prixtotal=" + prixTotal + "&totalours=" + totalours;

                // console.log(data);
                window.location.assign(URL);
            });

        }); // fin du clic formulaire
        
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