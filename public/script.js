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
                eventBlock.style.background = '#f7e9ff'
                content = ``
            })
        })
    })
    
})

if(window.location.href.indexOf('home') < 0 && window.location.href.indexOf('login') < 0 && window.location.href.indexOf('change') < 0) {

    const body = document.querySelector('body')
    const userTypeChoice = document.querySelector('#userTypeChoice')
    const authForm = document.querySelector('#authForm')
    const authBlock = document.querySelector('#authBlock')
    const adminTypeButton = document.querySelector('#adminType')

    adminTypeButton.addEventListener('click', () => {

        authForm.setAttribute('action', '/login?userType=admin')

        userTypeChoice.style.display = 'none'

        authBlock.innerHTML = `
            <div class="auth-block-item">
                <label for="adminName">Логин</label>
                <input class="admin-name" type="text" name="adminName">
            </div>
            <div class="auth-block-item">
                <label for="adminPass">Пароль</label>
                <input class="admin-pass" type="password" name="adminPass">
            </div>
            <input class="auth-button" type="submit" value="Войти">
        `

    })

}