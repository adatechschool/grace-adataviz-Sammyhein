import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
import { createBoutonSeeMore } from './boutonSeeMore.js';
// import { rechercheEvent } from './searchBar.js';

// rechercheEvent()

const api = document.getElementById('api')
const event = document.getElementById('event')
const eventTemplate = document.querySelector("[data-event-template]")


// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))


// https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20

export async function fetchApi() {
  try {
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20"
    );
    const apiData = await response.json();
    console.log(apiData);


    const searchInput = document.getElementById("search")
    
    let events = []

    searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase()
        events.forEach( input =>{
            const isVisible = input.titre.toLowerCase().includes(value)
            input.element.classList.toggle("hide", !isVisible)
            console.log(events)
        })
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

    // Version avec une boucle for 

    // for(let i = 0 ; i < apiData.results.length ; i++){
    //   //console.log(i)

    //   const boite = document.createElement("div")
    //   boite.className = "boite"
    //   event.appendChild(boite)

    //   //Les Images
    //   const boiteImage = document.createElement("div")
    //   boiteImage.className = "boiteImage"
    //   boite.appendChild(boiteImage)

    //   const image = document.createElement("img")
    //   image.className = "image"
    //   image.src = apiData.results[i].cover_url
    //   boiteImage.appendChild(image)
      
    //   //Les textes
    //   const boiteText = document.createElement("div")
    //   boiteText.className = "boiteText"
    //   boite.appendChild(boiteText)

    //   const title = document.createElement("h1")
    //   title.className = "title"
    //   title.innerHTML = apiData.results[i].title
    //   boiteText.appendChild(title)
      
    //   const text = document.createElement("p")
    //   text.className = "text"
    //   text.innerHTML = apiData.results[i].lead_text
    //   boiteText.appendChild(text)

    //   //Description 
    //   const boiteDescription = document.createElement("div")
    //   boiteDescription.className = "boiteDescription"
    //   boite.appendChild(boiteDescription)

    //   //Les boutons 
    //   const bouton = createBoutonSeeMore(apiData.results[i].description, boiteDescription)
    //   boiteText.appendChild(bouton)

    //   // const description = document.createElement("p")
    //   // description.className = "description"
    //   // description.innerHTML = apiData.results[i].description
    //   // boiteText.appendChild(description)

    // }

    return apiData;
  } catch (error) {
    console.log(error);
  }
}
fetchApi();
