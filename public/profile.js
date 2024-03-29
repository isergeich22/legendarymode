const events = document.querySelectorAll('#event')

async function getSeasons() {

    let response = await fetch("./seasons.json")

    result = await response.json()

}

getSeasons()

let status = false

events.forEach(el => {

            el.addEventListener('click', () => {

                let index = result.seasons[result.seasons.findIndex(ssn => ssn.seasonNumber === el.children[0].innerHTML)].events.findIndex(evt => evt.eventNumber === el.children[1].innerHTML)

                let event = result.seasons[result.seasons.findIndex(ssn => ssn.seasonNumber === el.children[0].innerHTML)].events[index]

                if(el.parentNode.children[1].classList.contains('hide') === true) {

                    el.parentNode.children[1].classList.remove('hide')

                    if(event.eventVideo.findIndex(evt => evt.videoAuthor === event.eventHost) >= 0) {

                        el.parentNode.children[1].innerHTML = `
                            <div id="video" class="profile-info-events-list__item-detailed__video">
                                <iframe width="500" height="281" src="${event.eventVideo[event.eventVideo.findIndex(evt => evt.videoAuthor === event.eventHost)].videoLink}" title="YouTube video player" 
                                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                                    gyroscope; picture-in-picture; web-share" allowfullscreen>
                                </iframe>
                            </div>
                            <div class="profile-info-events-list__item-detailed__desc">
                                <div class="profile-info-events-list__item-detailed__desc-item">
                                    <p>Название выпуска:</p>
                                    <p>${event.eventTitle}</p>
                                </div>
                                <div class="profile-info-events-list__item-detailed__desc-item">
                                    <p>Дата выпуска:</p>
                                    <p>${event.eventDate}</p>
                                </div>
                                <div class="profile-info-events-list__item-detailed__desc-item">
                                    <p>Игра выпуска:</p>
                                    <p>${event.eventGame}</p>
                                </div>
                                <div class="profile-info-events-list__item-detailed__desc-item">
                                    <p>Краткие правила:</p>
                                    <p>${event.eventDescription}</p>
                                </div>
                                <div class="profile-info-events-list__item-detailed__desc-hide">
                                    <button id="det">
                                        <a href="http://${window.location.host}/seasons?season=${el.parentNode.children[0].children[0].innerHTML}&event=${el.parentNode.children[0].children[1].innerHTML}">Подробнее</a>
                                    </button>
                                    <button id="hide">
                                        Скрыть
                                    </button>
                                </div>
                            </div>                        
                            `

                        }

                        if(event.eventVideo.findIndex(evt => evt.videoAuthor === event.eventHost) < 0) {
                            
                            el.parentNode.children[1].innerHTML = `
                            <div class="profile-info-events-list__item-detailed__desc">
                                <div class="profile-info-events-list__item-detailed__desc-item">
                                    <p>Название выпуска:</p>
                                    <p>${event.eventTitle}</p>
                                </div>
                                <div class="profile-info-events-list__item-detailed__desc-item">
                                    <p>Дата выпуска:</p>
                                    <p>${event.eventDate}</p>
                                </div>
                                <div class="profile-info-events-list__item-detailed__desc-item">
                                    <p>Игра выпуска:</p>
                                    <p>${event.eventGame}</p>
                                </div>
                                <div class="profile-info-events-list__item-detailed__desc-item">
                                    <p>Краткие правила:</p>
                                    <p>${event.eventDescription}</p>
                                </div>
                                <div class="profile-info-events-list__item-detailed__desc-hide">
                                    <button id="det">
                                    <a href="http://${window.location.host}/seasons?season=${el.parentNode.children[0].children[0].innerHTML}&event=${el.parentNode.children[0].children[1].innerHTML}">Подробнее</a>
                                    </button>
                                    <button id="hide">
                                        Скрыть
                                    </button>
                                </div>
                            </div>                        
                            `

                            console.log(window.location.href)
                            console.log(window.location.hostname)

                        }

                        const hide = document.querySelector('#hide')

                        hide.addEventListener('click', () => {

                            hide.parentNode.parentNode.parentNode.innerHTML = ``

                        })

                }
                
                if(el.parentNode.children[1].classList.contains('hide') === false) {
                    el.parentNode.children[1].classList.add('hide')
                }
                        
            })
    
})