// import "./functions.js";
import {$_GET,ajoutPanier, clearPanier, retraitDuPanier} from './functions.js';


let oursid = $_GET('id'); // prend l'id en parametre dans l'url

const produitseul = document.querySelector(".produit_seul");
const nom = document.getElementsByClassName('nom_ourson');
const description = document.getElementById('description_ourson');
const prix = document.getElementById('prix_ourson');
const imageours = document.getElementById('photo_ours');
let indice = 0;

if (produitseul) { // SI je suis sur la page de présentation d'un article seulement
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
}

let btnAjout = document.getElementById('bouton_ajout_panier');// mon id dans le HTML
// btnAjout.addEventListener('click', ajoutPanier); // action associée
btnAjout.addEventListener('click', function(){ajoutPanier(oursid)}); // action associée

let btndelete = document.getElementById('bouton_delete_panier'); // mon id dans le HTML
btndelete.addEventListener('click', clearPanier); // action associée

let btnminus = document.getElementById('bouton_minus_panier'); // mon id dans le HTML
btnminus.addEventListener('click', function(){retraitDuPanier(oursid)}); // action associée
