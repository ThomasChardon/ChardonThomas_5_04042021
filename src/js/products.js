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

{/* <form>
  <input type="button" value="Démarrer la machine">
</form>
<p>La machine est arrêtée.</p> */}

let listePanier = [];
let btn = document.getElementById('bouton_ajout_panier');
// console.log(btn);
// console.log(oursid);

btn.addEventListener('click', updatePanier);

function recuperationPanier() {
    listePanier = localStorage.getItem("id");
    // console.log("liste des id : " + listePanier); ///////////
}
let btntest = document.getElementById('bouton_voir_panier');
btntest.addEventListener('click', ajoutPanier);

function ajoutPanier() {
    recuperationPanier();
    listePanier = listePanier + "," + oursid;
    // localStorage.setItem("id", listePanier);
    console.log(listePanier + " est de type : " + typeof listePanier);
}

function updatePanier() {
    if (oursid) {
        console.error("OK");
        localStorage.setItem("id", oursid);
    } else {
        console.error("PAS MARCHE");
    }
}
function cleanPanier () {
    localStorage.clear();
}