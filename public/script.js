let result

async function getSeasons() {

    let response = await fetch("./seasons.json")

    result = await response.json()

}

getSeasons()

const seasonsButton = document.querySelectorAll('.season-number')
const seasonBlock = document.querySelector('#seasons')
const eventBlock = document.querySelector('#eventBody')

let content = ``
let eventButtons

seasonsButton.forEach(el => {    
    el.addEventListener('click', () => {        
        let season = (result.seasons.find(item => item.seasonNumber === el.id))
        content += `<div class="seasons-header">
                    <h1 class="seasons-header__text">${season.seasonNumber}</h1>
                </div>
                <div id="eventsBlock" class="season-body">`
        season.events.forEach(elem => {            
            content += `<div class="btn-group">
                            <button class="btn btn-event btn-lg season-event" id="${elem.eventNumber}" type="button">
                                ${elem.eventNumber} выпуск
                            </button>
                            <ul class="dropdown-menu">
                                <li>Hello World</li>
                            </ul>
                        </div>`
        })
        content += `</div>`
        seasonBlock.innerHTML = content
        content = ``
        eventButtons = document.querySelectorAll('.season-event')
        eventButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                let event = season.events.find(evt => evt.eventNumber === btn.id)
                content += `<div class="event-body-item">
                                <iframe width="720" height="405" src="${event.eventVideo}" title="YouTube video player" 
                                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                                    gyroscope; picture-in-picture; web-share" allowfullscreen>
                                </iframe>
                            </div>
                            <div class="event-body-item text-block">
                                <div class="text-block-item">
                                    <p>Ведущий:</p>
                                    <h3>${event.eventHost}</h3>
                                </div>
                                <div class="text-block-item">
                                    <p>Игра:</p>
                                    <p>${event.eventGame}</p>
                                </div>
                                <div class="text-block-item">
                                    <p>Краткие правила:</p>
                                    <p>${event.eventDescription}</p>
                                </div>
                            </div>`
                eventBlock.innerHTML = content
                content = ``
            })
        })
    })
    
})