export function favorite(containerName, counter, carte){

    const filtre = document.querySelector(".filtreFavoris")

    //let count = 0
    //console.log(count)

    filtre.innerText = `Favoris (${counter.value})`

    let bouton = document.createElement('button')
    bouton.className = "boutonFavoris"
    //bouton.textContent = "favoris"

    let img = document.createElement("img")
    let imageCoeurVide = '/src/Heartvide.png'
    let imageCoeurRemplis = '/src/HeartRemplis.png'
    img.src = imageCoeurVide
    img.alt = "favoris"
    img.className = "heart"

    bouton.appendChild(img)
    containerName.appendChild(bouton)

    bouton.addEventListener("click", () =>{
        if(img.src.includes(imageCoeurVide)){
            img.src = imageCoeurRemplis // on rempli le coeur
            counter.value ++ // on ajoute 1 au compteur
            carte.dataset.favori = "true" // on change le statue de la data pour qu'elle devienne "true"
            
        } else{
            img.src = imageCoeurVide //effet inverse que au dessus
            counter.value -- 
            carte.dataset.favori = "false"
            
        }
        filtre.innerText = `Favoris (${counter.value})`
        console.log(counter.value)
    })
}
