export function $_GET(argument) { // export function : permet de l'envoyer dans d'autres fichiers js
  const url = window.location.href; // url vaut l'url de la page en cours
  
  return url.searchParams.get(argument); // cherche l'argument dans les parametres de l'url. Renvoie null ou la valeur de cet argument
}
  
//exemple : let mavariable = $_GET(id); // mavariable vaudra la valeur de l'id dans l'url