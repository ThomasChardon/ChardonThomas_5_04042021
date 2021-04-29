// import "./functions.js";
import {ajoutPanier, clearPanier, retraitDuPanier} from './functions.js';

let myurl = new URL(window.location.href); // url vaut l'url de la page en cours
let oursid = myurl.searchParams.get('id');

const produitseul = document.querySelector(".produit_seul");

let listeArray = [];
const idourson = document.getElementsByTagName('article');
const nom = document.getElementsByClassName('nom_ourson');
const description = document.getElementById('description_ourson');
const prix = document.getElementById('prix_ourson');
const imageours = document.getElementById('photo_ours');
let indice = 0;

if (produitseul) {
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

let btnAjout = document.getElementById('bouton_ajout_panier');
btnAjout.addEventListener('click', ajoutPanier);

let btndelete = document.getElementById('bouton_delete_panier'); // mon id dans le HTML
btndelete.addEventListener('click', clearPanier); // action associée

let btnminus = document.getElementById('bouton_minus_panier');
btnminus.addEventListener('click', function(){retraitDuPanier(oursid)}); // action associée
