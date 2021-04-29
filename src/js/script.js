//Pour lancer le code avec VSC : faire F1 puis "Run code"
//Ou bien le raccourci CTRL + ALT + N

import "./products.js";
// import {$_GET} from "./functions"; // marche pas
// Uncaught SyntaxError: Cannot use import statement outside a module





// let myurl = new URL(window.location.href); // url vaut l'url de la page en cours
// let oursid = myurl.searchParams.get('id');


// let listeArray = [];

// const idourson = document.getElementsByTagName('article');
// const nom = document.getElementsByClassName('nom_ourson');
// const description = document.getElementById('description_ourson');
// const prix = document.getElementById('prix_ourson');
// const imageours = document.getElementById('photo_ours');
// let indice = 0;


// fetch("http://localhost:3000/api/teddies")
// .then((res) => res.json()) // conversion JSON
// .then((listeArray) => {
//     for (let i=0; i< listeArray.length; i++){ // à quel ours avons-nous à faire ?
//         if (listeArray[i]._id == oursid) {
//             indice = i;
//         }
//     }

// nom[0].innerHTML = listeArray[indice].name;

// description.innerHTML = listeArray[indice].description;
// prix.innerHTML = "Prix : " + (listeArray[indice].price /100) + " €";
// imageours.src = listeArray[indice].imageUrl;
// });






//TODO
/* 
voir local storage (pierre giraud)
creation de product via id en param dans l'url (voir window et ses methodes)
reorganiser JS (dossiers sous dossiers)
cela implique de faire des conditions propres aux debut des fichiers pour fetch seulement si on est au bon endroit

dans index, mettre liste articles a vide et la remplir via fetch

get parameters :
recuperer url : https://developer.mozilla.org/fr/docs/Web/API/Window
creer une instance d'URL : https://developer.mozilla.org/fr/docs/Web/API/URL
solutions : https://github.com/thomas-claireau/orinoco-oc/blob/dev/src/functions.js

remplacer les chemins (home.js dans index.html)

IMPORT marche pas

*/