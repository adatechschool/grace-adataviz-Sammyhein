import './style.css'
import { createBoutonSeeMore } from './boutonSeeMore.js';
import { showReturnBouton } from './returnBouton.js';
//import { chargerPlus } from '../chargerPlus.js';


const event = document.getElementById('event')
const eventTemplate = document.querySelector("[data-event-template]")
const searchInput = document.getElementById("search")
const returnBouton = document.getElementById("returnBouton")

// https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20

let limit = 20
let offset = 0
let events = []

async function fetchApi() {
  try {

    const response = await fetch(
      `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=${limit}&offset=${offset}`
    );
    const apiData = await response.json();
    console.log(apiData);

    searchInput.addEventListener("input", e => {

        let value = e.target.value.trim().toLowerCase()

        let hasResults = false //ceci va me servir quand il n'y aura pas de résultat

        events.forEach( input =>{
            const isVisible = input.titre.toLowerCase().includes(value)
            input.element.classList.toggle("hide", !isVisible)
            //console.log(events)
            if (isVisible){
              hasResults = true // si il y a au moins 1 resultat qui s'affiche alors on le transforme à true
              returnBouton.hidden = true
            }
        })

        if (!hasResults){ // si il n'y a pas de "isVisible", et donc que hasResults reste false alors on m'indique une erreur
          //console.log("erreur")
          returnBouton.hidden = false
          showReturnBouton(searchInput)
        }
    })
    
    events = apiData.results.map(evenement => {
      //je lie et je clone mon template que j'ai mis dans mon html
      const currentEvent = eventTemplate.content.cloneNode(true);
      //console.log(evenement)

      //je définie mes éléments que j'ai mis dans le template HTML
      const boite = currentEvent.querySelector(".boite");
      const title = currentEvent.querySelector(".title");
      const dateStart = currentEvent.querySelector(".dateStart")
      const dateEnd = currentEvent.querySelector(".dateEnd")
      const text = currentEvent.querySelector(".text");
      const img = currentEvent.querySelector(".image");

      // je remplie les éléments
      img.src = evenement.cover_url;
      title.textContent = evenement.title;

      if(evenement.date_start != null){
        //Cette partie je formate les dates pour l'afficher commme je le souhaite et l'heure
        const rawDate = evenement.date_start
        const d = new Date(rawDate)

        const formatted =`${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2, '0')}.${d.getFullYear()}`
        const time = `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2, "0")}`

        dateStart.textContent = `Début : ${formatted} à ${time}`
      }

       if(evenement.date_end != null){
        const rawDate = evenement.date_end
        const d = new Date(rawDate)

        const formatted =`${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2, '0')}.${d.getFullYear()}`
        const time = `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2, "0")}`

        dateEnd.textContent = `Fin : ${formatted} à ${time}`
      }

      text.textContent = evenement.lead_text;

      // Je n'oublie pas mon bouton
      const bouton = createBoutonSeeMore(evenement.description, boite);
      boite.querySelector(".boiteText").appendChild(bouton);

      // j'affiche le résultat
      event.appendChild(currentEvent);

      // On demande ce qu'il nous retourne
      return { image : evenement.cover_url , titre : evenement.title , text : evenement.lead_text , element : boite}
      
    });


    return apiData;
  } catch (error) {
    console.log(error);
  }
}
fetchApi();

// chargerPlus(limit, offset, fetchApi)
