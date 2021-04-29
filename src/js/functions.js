export function $_GET(argument) { // export function : permet de l'envoyer dans d'autres fichiers js
  const url = window.location.href; // url vaut l'url de la page en cours
  
  return url.searchParams.get(argument); // cherche l'argument dans les parametres de l'url. Renvoie null ou la valeur de cet argument
}
  
//exemple : let mavariable = $_GET(id); // mavariable vaudra la valeur de l'id dans l'url

let myurl = new URL(window.location.href); // url vaut l'url de la page en cours
let oursid = myurl.searchParams.get('id');

let panier = "";
let listePanier = []; // pour l'instant inutilisé

export function ajoutPanier() {
  panier = recuperationPanier();
  if (panier == null || panier == "") {
      panier = oursid;
  } else {
      panier = panier + "," + oursid;
  }
  localStorage.setItem("id", panier);
}

export function recuperationPanier() {
  let panierEnCours = localStorage.getItem("id");
  return panierEnCours;
}

export function clearPanier () {
  localStorage.clear();
}

export function retraitDuPanier (id) {
  panier = recuperationPanier();
  if (!panier) {
      console.log("Pas de panier")
      listePanier.splice(0, listePanier.length); // RAZ tableau
  }
  else if (panier.length > 30) {
      listePanier = panier.split(',');
  } else {
      listePanier[0] = panier;
  }
  console.log("Panier avant retrait : " + listePanier);
  if (listePanier == null){
      console.log("Pas de retrait car panier vide");
  } else {
      for (let i = 0; i < listePanier.length; i++) {
          if (listePanier[i] == id) {
              listePanier.splice(i, 1);
              console.log("retrait successfull");
              if (listePanier.length == 0){
                console.log("panier totalement vide");
                listePanier.splice(0, listePanier.length); // RAZ tableau
              }
              break;
          }
          if (i == listePanier.length -1){
              console.log("item non trouvé");
          }
      }
      if (listePanier == null) {
        clearPanier();
      } else {
        panier = listePanier.toString();
        localStorage.setItem("id", panier);
      }
  }
  console.log("Panier APRES retrait : " + panier);
}