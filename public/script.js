let result
let players = ['DMITRY_BALE', 'Juice', 'orkpod', 'vika_karter', 'WELOVEGAMES']

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
            if(parseInt(elem.eventNumber) / 5 >= 2 && parseInt(elem.eventNumber) % 5 > 0) {

                content += `<div class="btn-group">
                                <button class="btn btn-event btn-lg season-event" id="${elem.eventNumber}" type="button">
                                    ${elem.eventNumber} выпуск (бонусный)
                                </button>
                                <ul class="dropdown-menu">
                                    <li>Hello World</li>
                                </ul>
                            </div>`

            } else {

                content += `<div class="btn-group">
                                <button class="btn btn-event btn-lg season-event" id="${elem.eventNumber}" type="button">
                                    ${elem.eventNumber} выпуск
                                </button>
                                <ul class="dropdown-menu">
                                    <li>Hello World</li>
                                </ul>
                            </div>`

            }
        })
        content += `</div>`
        seasonBlock.innerHTML = content
        content = ``
        eventButtons = document.querySelectorAll('.season-event')
        eventButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                eventButtons.forEach(el => {
                    if(el.id !== btn.id) {
                        el.classList.remove('season-event-active')
                    }
                })
                btn.classList.add('season-event-active')                
                let seasonResult = [
                ]
                let event = season.events.find(evt => evt.eventNumber === btn.id)
                let index = season.events.indexOf(event)

                    for(let i = 0; i < players.length; i++) {
                        let pointsSum = 0
                        for(let j = 0; j <= index; j++) {
                            if(players[i] !== season.events[j].eventHost) {
                                if(season.events[j].eventResults.findIndex(evt => evt.player === players[i]) >= 0) {
                                    if(season.events[j].isBonus === false) {
                                        pointsSum += season.rules.find(rule => rule.eventPlace === parseInt(season.events[j].eventResults.find(evt => evt.player === players[i]).position)).placePoints
                                    }
                                    if(season.events[j].isBonus === true) {
                                        if(season.events[j].eventResults.find(evt => evt.player === players[i]).position === '1') {
                                            pointsSum += 1
                                        }
                                    }

                                }

                            }
                        }

                        // console.log(pointsSum)
                        
                        seasonResult.push({
                            playerName: players[i],
                            seasonPoints: pointsSum
                        })

                    }

                // seasonResult.forEach(el => {
                //     console.log(`${el.playerName} - ${el.seasonPoints}`)
                // })

                let seasonResultsContent = ``

                let max = 0

                for(let i = 0; i < seasonResult.length; i++) {
                    
                    if(seasonResult[i].seasonPoints > max) {
                        max = seasonResult[i].seasonPoints
                    }

                }

                let values = []

                for(let i = 0; i < seasonResult.length; i++) {

                    if(values.indexOf(seasonResult[i].seasonPoints) < 0) {

                        values.push(seasonResult[i].seasonPoints)

                    }

                }

                values.sort((a, b) => b - a)

                console.log(values)

                for(let i = 0; i < values.length; i++) {

                    for(let j = 0; j < seasonResult.length; j++) {

                        if(seasonResult[j].seasonPoints === values[i]) {
                            seasonResultsContent += `<div class="season-results-item">${i+1} место - ${seasonResult[j].playerName} (${seasonResult[j].seasonPoints})</div>`
                        }

                    }

                }
                
                let [firstPlace, secondPlace, thirdPlace, fourthPlace] = [event.eventResults.find(evt => evt.position === "1"), event.eventResults.find(evt => evt.position === "2"), event.eventResults.find(evt => evt.position === "3"), event.eventResults.find(evt => evt.position === "4")]
                let [firstPlaceRule, secondPlaceRule, thirdPlaceRule, fourthPlaceRule] = [season.rules.find(rule => rule.eventPlace === 1), season.rules.find(rule => rule.eventPlace === 2), season.rules.find(rule => rule.eventPlace === 3), season.rules.find(rule => rule.eventPlace === 4)]
                // console.log([firstPlace, secondPlace, thirdPlace, fourthPlace])
                if(fourthPlace !== undefined && thirdPlace !== undefined) {

                    content += `<div class="event-body-item">
                                    <iframe width="640" height="360" src="${event.eventVideo}" title="YouTube video player" 
                                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                                        gyroscope; picture-in-picture; web-share" allowfullscreen>
                                    </iframe>
                                </div>
                                <div class="event-body-item text-block">
                                    <div class="text-block-item">
                                        <p>Ведущий:</p>
                                        <p><a href="">${event.eventHost}</a></p>
                                    </div>
                                    <div class="text-block-item">
                                        <p>Игра:</p>
                                        <p>${event.eventGame}</p>
                                    </div>
                                    <div class="text-block-item">
                                        <p>Название ивента:</p>
                                        <p>${event.eventTitle}</p>
                                    </div>
                                    <div class="text-block-item">
                                        <p>Дата ивента:</p>
                                        <p>${event.eventDate}</p>
                                    </div>
                                    <div class="text-block-item">
                                        <p>Краткие правила:</p>
                                        <p>${event.eventDescription}</p>
                                    </div>
                                </div>
                                <div class="results-block">                                
                                    <div class="event-results">
                                        <div class="event-results-header">
                                            <h1>ИТОГИ ВЫПУСКА</h1>
                                        </div>
                                        <div class="event-results-item">
                                            1 место: ${firstPlace.player} - (${firstPlaceRule.placePoints} очка)
                                        </div>
                                        <div class="event-results-item">
                                            2 место: ${secondPlace.player} - (${secondPlaceRule.placePoints} очка)
                                        </div>
                                        <div class="event-results-item">
                                            3 место: ${thirdPlace.player} - (${thirdPlaceRule.placePoints} очка)
                                        </div>
                                        <div class="event-results-item">
                                            4 место: ${fourthPlace.player} - (${fourthPlaceRule.placePoints} очко)
                                        </div>
                                    </div>
                                    <div class="season-results">
                                        <div class="season-results-header">
                                            <h1>ПРОМЕЖУТОЧНЫЙ ИТОГ СЕЗОНА</h1>
                                        </div>
                                        ${seasonResultsContent}
                                    </div>
                                </div>
                                `                            
                    eventBlock.innerHTML = content
                    eventBlock.style.background = '#f7e9ff'
                    content = ``

                }

                if(fourthPlace === undefined && thirdPlace !== undefined) {

                    content += `<div class="event-body-item">
                                    <iframe width="640" height="360" src="${event.eventVideo}" title="YouTube video player" 
                                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                                        gyroscope; picture-in-picture; web-share" allowfullscreen>
                                    </iframe>
                                </div>
                                <div class="event-body-item text-block">
                                    <div class="text-block-item">
                                        <p>Ведущий:</p>
                                        <p><a href="">${event.eventHost}</a></p>
                                    </div>
                                    <div class="text-block-item">
                                        <p>Игра:</p>
                                        <p>${event.eventGame}</p>
                                    </div>
                                    <div class="text-block-item">
                                        <p>Название ивента:</p>
                                        <p>${event.eventTitle}</p>
                                    </div>
                                    <div class="text-block-item">
                                        <p>Дата ивента:</p>
                                        <p>${event.eventDate}</p>
                                    </div>
                                    <div class="text-block-item">
                                        <p>Краткие правила:</p>
                                        <p>${event.eventDescription}</p>
                                    </div>
                                </div>
                                <div class="results-block">                                
                                    <div class="event-results">
                                        <div class="event-results-header">
                                            <h1>ИТОГИ ВЫПУСКА</h1>
                                        </div>
                                        <div class="event-results-item">
                                            1 место: ${firstPlace.player} - (2 очка)
                                        </div>
                                        <div class="event-results-item">
                                            2 место: ${secondPlace.player} - (1 очко)
                                        </div>
                                        <div class="event-results-item">
                                            3 место: ${thirdPlace.player} - (0 очка)
                                        </div>
                                    </div>
                                    <div class="season-results">
                                        <div class="season-results-header">
                                            <h1>ПРОМЕЖУТОЧНЫЙ ИТОГ СЕЗОНА</h1>
                                        </div>
                                        ${seasonResultsContent}
                                    </div>
                                </div>
                                `                            
                    eventBlock.innerHTML = content
                    eventBlock.style.background = '#f7e9ff'
                    content = ``

                }

                if(fourthPlace === undefined && thirdPlace === undefined) {

                    content += `<div class="event-body-item">
                                    <iframe width="640" height="360" src="${event.eventVideo}" title="YouTube video player" 
                                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                                        gyroscope; picture-in-picture; web-share" allowfullscreen>
                                    </iframe>
                                </div>
                                <div class="event-body-item text-block">
                                    <div class="text-block-item">
                                        <p>Ведущий:</p>
                                        <p><a href="">${event.eventHost}</a></p>
                                    </div>
                                    <div class="text-block-item">
                                        <p>Игра:</p>
                                        <p>${event.eventGame}</p>
                                    </div>
                                    <div class="text-block-item">
                                        <p>Название ивента:</p>
                                        <p>${event.eventTitle}</p>
                                    </div>
                                    <div class="text-block-item">
                                        <p>Дата ивента:</p>
                                        <p>${event.eventDate}</p>
                                    </div>
                                    <div class="text-block-item">
                                        <p>Краткие правила:</p>
                                        <p>${event.eventDescription}</p>
                                    </div>
                                </div>
                                <div class="results-block">                                
                                    <div class="event-results">
                                        <div class="event-results-header">
                                            <h1>ИТОГИ ВЫПУСКА</h1>
                                        </div>
                                        <div class="event-results-item">
                                            1 место: ${firstPlace.player} - (1 очко)
                                        </div>
                                        <div class="event-results-item">
                                            2 место: ${secondPlace.player} - (0 очков)
                                        </div>
                                    </div>
                                    <div class="season-results">
                                        <div class="season-results-header">
                                            <h1>ПРОМЕЖУТОЧНЫЙ ИТОГ СЕЗОНА</h1>
                                        </div>
                                        ${seasonResultsContent}
                                    </div>
                                </div>
                                `                            
                    eventBlock.innerHTML = content
                    eventBlock.style.background = '#f7e9ff'
                    content = ``

                }

            })
        })
    })
    
})

// if(window.location.href.indexOf('home') < 0 && window.location.href.indexOf('login') < 0 && window.location.href.indexOf('change') < 0) {

//     const body = document.querySelector('body')
//     const userTypeChoice = document.querySelector('#userTypeChoice')
//     const authForm = document.querySelector('#authForm')
//     const authBlock = document.querySelector('#authBlock')
//     const adminTypeButton = document.querySelector('#adminType')

//     adminTypeButton.addEventListener('click', () => {

//         authForm.setAttribute('action', '/login?userType=admin')

//         userTypeChoice.style.display = 'none'

//         authBlock.innerHTML = `
//             <div class="auth-block-item">
//                 <label for="adminName">Логин</label>
//                 <input class="admin-name" type="text" name="adminName">
//             </div>
//             <div class="auth-block-item">
//                 <label for="adminPass">Пароль</label>
//                 <input class="admin-pass" type="password" name="adminPass">
//             </div>
//             <input class="auth-button" type="submit" value="Войти">
//         `

//     })

// }