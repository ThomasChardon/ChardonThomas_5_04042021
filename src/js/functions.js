export function $_GET(argument) { // export function : permet de l'envoyer dans d'autres fichiers js
  const url = new URL (window.location.href); // url vaut l'url de la page en cours
  
  return url.searchParams.get(argument); // cherche l'argument dans les parametres de l'url. Renvoie null ou la valeur de cet argument
}
  
//exemple : let mavariable = $_GET(id); // mavariable vaudra la valeur de l'id dans l'url



let panier = "";
let listePanier = [];

export function ajoutPanier(leID) { // ajout
  panier = recuperationPanier();
  if (panier == null || panier == "") {
      panier = leID;
  } else {
      panier = panier + "," + leID;
  }
  localStorage.setItem("id", panier);
}

export function recuperationPanier() {
  let panierEnCours = localStorage.getItem("id");
  return panierEnCours;
}

export function recuperationPanierArray() {
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
  return listePanier;
}

export function recuperationQuantite(id){
  let quantite = 0;
  panier = recuperationPanier();
  if (!panier) {
    return quantite = 0;
  }
  else if (panier.length > 30) {
    listePanier = panier.split(',');
    for (let i =0; i < listePanier.length; i++){
      if (listePanier[i] == id) {
        quantite ++;
      }
    }
    return quantite;
  } else {
    if (panier == id) {
      quantite ++;
    }
    return quantite;
  }
}

export function clearPanier () {
  localStorage.clear();
}

export function clearProductPanier (id) {
  listePanier = recuperationPanierArray();

  if (listePanier == null){
    console.log("Pas de retrait car panier vide");
} else {
    for (let i = 0; i < listePanier.length; i++) {
        if (listePanier[i] == id) {
            listePanier.splice(i, 1); //retrait d'un élément du panier
            i--; // on décrémente i sinon on peut rater des éléments
            if (listePanier.length == 0){
              console.log("panier totalement vide");
              listePanier.splice(0, listePanier.length); // RAZ tableau
            }
        }
    }
    if (listePanier == null) {
      clearPanier();
    } else {
      panier = listePanier.toString();
      localStorage.setItem("id", panier);
    }
}
}

export function retraitDuPanier (id) {
  panier = recuperationPanier();
  listePanier = recuperationPanierArray();
  // console.log("Panier avant retrait : " + listePanier);
  if (listePanier == null){
      console.log("Pas de retrait car panier vide");
  } else {
      for (let i = 0; i < listePanier.length; i++) {
          if (listePanier[i] == id) {
              listePanier.splice(i, 1); //retrait d'un élément du panier
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
  // console.log("Panier APRES retrait : " + panier);
}