import {$_GET,ajoutPanier, clearPanier, retraitDuPanier,AffichagePastille} from './functions.js';



document.addEventListener("DOMContentLoaded", () => {
    let order__id = $_GET('Order_id'); // prend l'id en parametre dans l'url
    if (order__id) { // si commande existe, alors
        //prendre les infos en dur dans l'URL
        //let nom = $get (lastname) ect...
        // modifier innerhtml avec les variables


        //On affiche la pastille qu'une fois parce qu'elle n'est pas destinée à changer sur cette page
        AffichagePastille();
    }



      



    

})