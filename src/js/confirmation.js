import {$_GET, AffichagePastille, clearPanier} from './functions.js';



document.addEventListener("DOMContentLoaded", () => {
    let order_id = $_GET('Order_id'); // prend l'id en parametre dans l'url
    if (order_id) { // si commande existe, alors
        //prendre les infos en dur dans l'URL
        let nom = $_GET('lastName');
        let prenom = $_GET('firstName');
        let ville = $_GET('city');
        let adresse = $_GET('address');
        let mail = $_GET('email');
        let prixtotal = $_GET('prixtotal');
        let totalours = $_GET('totalours');


        let affichageFinalisation = document.getElementById('finalisation');
        affichageFinalisation.innerHTML = `Bonjour ${prenom}, merci d'avoir commandé chez Orinoco.<br/>
        Un mail contenant le détail de la commande a été envoyé à ${mail}.<br/>
        Détails de la commande :<br/>
        Numéro de commande :${order_id}.<br/>
        Nombre d'articles : ${totalours}.<br/>
        Prix total : ${prixtotal /100},${prixtotal %100}€.<br/>
        Adresse de facturation :<br/><br/>
        <div id="adresse_facturation">
            ${prenom} ${nom},<br/>
            ${adresse},<br/>
            ${ville}.<br/>
        </div>`
        
        clearPanier();
        //On affiche la pastille qu'une fois parce qu'elle n'est pas destinée à changer sur cette page
        AffichagePastille();
    }

    

})
