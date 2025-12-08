export function favorite(containerName){

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
            img.src = imageCoeurRemplis
        } else{
            img.src = imageCoeurVide
        }
    })
}