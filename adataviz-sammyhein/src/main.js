import './style.css'
import { createBoutonSeeMore } from './boutonSeeMore.js';
import { showReturnBouton } from './returnBouton.js';


const event = document.getElementById('event')
const eventTemplate = document.querySelector("[data-event-template]")
const searchInput = document.getElementById("search")
const returnBouton = document.getElementById("returnBouton")

// https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20

export async function fetchApi() {
  try {
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20"
    );
    const apiData = await response.json();
    console.log(apiData);

    
    let events = []

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
          console.log("erreur")
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
      const text = currentEvent.querySelector(".text");
      const img = currentEvent.querySelector(".image");

      // je remplie les éléments
      img.src = evenement.cover_url;
      title.textContent = evenement.title;
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
