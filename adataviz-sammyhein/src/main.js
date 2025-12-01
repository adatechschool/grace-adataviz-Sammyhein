import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

const api = document.getElementById('api')
const event = document.getElementById('event')


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

async function fetchApi() {
  try {
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20"
    );
    const apiData = await response.json();
    console.log(apiData);

    for(let i = 0 ; i < apiData.results.length ; i++){
      //console.log(i)

      const boite = document.createElement("div")
      boite.className = "boite"
      event.appendChild(boite)

      const image = document.createElement("img")
      image.className = "image"
      image.src = apiData.results[i].cover_url
      boite.appendChild(image)

      const title = document.createElement("h1")
      title.className = "title"
      title.innerHTML = apiData.results[i].title
      boite.appendChild(title)
      
      const text = document.createElement("h2")
      text.className = "text"
      text.innerHTML = apiData.results[i].lead_text
      boite.appendChild(text)

      const description = document.createElement("p")
      description.className = "description"
      description.innerHTML = apiData.results[i].description
      boite.appendChild(description)

    }

    return apiData;
  } catch (error) {
    console.log(error);
  }
}
fetchApi();
