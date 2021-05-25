// import "./functions.js";
import {$_GET,ajoutPanier, clearProductPanier, retraitDuPanier,AffichagePastille} from './functions.js';

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
            for (let i=0; i< listeArray.length; i++){
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
        
        let btnAjout = document.getElementById('bouton_ajout_panier');
        btnAjout.addEventListener('click', function(){ajoutPanier(oursid)}); 
        btnAjout.addEventListener('click', function(){AffichagePastille()}); 
        
        let btndelete = document.getElementById('bouton_delete_panier'); // mon id dans le HTML
        btndelete.addEventListener('click', function(){clearProductPanier(oursid)}); // action associée
        btndelete.addEventListener('click', function(){AffichagePastille()}); 
        
        let btnminus = document.getElementById('bouton_minus_panier');
        btnminus.addEventListener('click', function(){retraitDuPanier(oursid)}); 
        btnminus.addEventListener('click', function(){AffichagePastille()});

}
