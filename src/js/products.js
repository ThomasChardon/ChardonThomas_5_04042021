// import "./functions.js";
import {$_GET,ajoutPanier, clearPanier, retraitDuPanier,AffichagePastille} from './functions.js';

const produitseul = document.querySelector(".produit_seul");

if (produitseul) { // SI je suis sur la page de présentation d'un article seulement

let oursid = $_GET('id'); // prend l'id en parametre dans l'url
const nom = document.getElementsByClassName('nom_ourson');
const description = document.getElementById('description_ourson');
const prix = document.getElementById('prix_ourson');
const imageours = document.getElementById('photo_ours');
let indice = 0;

    fetch("http://localhost:3000/api/teddies")
    .then((res) => res.json()) // conversion JSON
    .then((listeArray) => {
        for (let i=0; i< listeArray.length; i++){ // à quel ours avons-nous à faire ?
            if (listeArray[i]._id == oursid) {
                indice = i;
            }
        }
    
    nom[0].innerHTML = listeArray[indice].name;
    
    description.innerHTML = listeArray[indice].description;
    prix.innerHTML = "Prix : " + (listeArray[indice].price /100) + " €";
    imageours.src = listeArray[indice].imageUrl;
    });
    AffichagePastille();


    
    let btnAjout = document.getElementById('bouton_ajout_panier');// mon id dans le HTML
    // btnAjout.addEventListener('click', ajoutPanier); // action associée
    btnAjout.addEventListener('click', function(){ajoutPanier(oursid)}); // action associée
    btnAjout.addEventListener('click', function(){AffichagePastille()}); // action associée
    
    let btndelete = document.getElementById('bouton_delete_panier'); // mon id dans le HTML
    btndelete.addEventListener('click', clearPanier); // action associée
    btndelete.addEventListener('click', function(){AffichagePastille()}); // action associée
    
    let btnminus = document.getElementById('bouton_minus_panier'); // mon id dans le HTML
    btnminus.addEventListener('click', function(){retraitDuPanier(oursid)}); // action associée
    btnminus.addEventListener('click', function(){AffichagePastille()}); // action associée


    // AffichagePastille(); // On affiche la pastille une première fois, et ensuite on observe les changements
    // // Selectionne le noeud dont les mutations seront observées
    // let targetNode = document.getElementById('observer');
    // // Options de l'observateur (quelles sont les mutations à observer)
    // let config = { attributes: true, childList: true, subtree: true };
    // // Créé une instance de l'observateur lié à la fonction de callback
    // let observer = new MutationObserver(AffichagePastille);
    // // Commence à observer le noeud cible pour les mutations précédemment configurées
    // observer.observe(targetNode, config);
    // // L'observation peut être arrêtée par la suite
    // // observer.disconnect();


}
