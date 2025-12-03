export function rechercheEvent(events){
    const searchInput = document.getElementById("search")

    searchInput.addEventListener("input", e => {
        const value = e.target.value
        inputSearch.forEach( input =>{
            const isVisible = input.title.includes(value)
            input.element.classList.toggle("hide", !isVisible)
        })
    })

    console.log(events)
    
}