//Pour lancer le code avec VSC : faire F1 puis "Run code"
//Ou bien le raccourci CTRL + ALT + N

let liste = [
    {
      "colors": [
        "Tan",
        "Chocolate",
        "Black",
        "White"
      ],
      "_id": "5be9c8541c9d440000665243",
      "name": "Norbert",
      "price": 2900,
      "imageUrl": "http://localhost:3000/images/teddy_1.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "colors": [
        "Pale brown",
        "Dark brown",
        "White"
      ],
      "_id": "5beaa8bf1c9d440000a57d94",
      "name": "Arnold",
      "price": 3900,
      "imageUrl": "http://localhost:3000/images/teddy_2.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "colors": [
        "Brown"
      ],
      "_id": "5beaaa8f1c9d440000a57d95",
      "name": "Lenny and Carl",
      "price": 5900,
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "imageUrl": "http://localhost:3000/images/teddy_3.jpg"
    },
    {
      "colors": [
        "Brown",
        "Blue",
        "Pink"
      ],
      "_id": "5beaabe91c9d440000a57d96",
      "name": "Gustav",
      "price": 4500,
      "imageUrl": "http://localhost:3000/images/teddy_4.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "colors": [
        "Beige",
        "Tan",
        "Chocolate"
      ],
      "_id": "5beaacd41c9d440000a57d97",
      "name": "Garfunkel",
      "price": 5500,
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "imageUrl": "http://localhost:3000/images/teddy_5.jpg"
    }
  ];

// console.log(liste[0]);
let listeArray = [];

const idourson = document.getElementsByTagName('article');
const nom = document.getElementById('nom_ourson');
const description = document.getElementById('description_ourson');
const prix = document.getElementById('prix_ourson');
const imageours = document.getElementById('photo_ours');
let indice = 0;

fetch("http://localhost:3000/api/teddies")
.then((res) => res.json()) // conversion JSON
.then((listeArray) => {
    for (let i=0; i< listeArray.length; i++){ // à quel ours avons-nous à faire ?
        if (listeArray[i]._id == idourson[0].id) {
            indice = i;
        }
    }
    nom.innerHTML = listeArray[indice].name;
    description.innerHTML = listeArray[indice].description;
    prix.innerHTML = "Prix : " + (listeArray[indice].price /100) + " €";
    imageours.src = listeArray[indice].imageUrl;
    });
