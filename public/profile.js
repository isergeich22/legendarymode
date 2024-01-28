const events = document.querySelectorAll('#event')

async function getSeasons() {

    let response = await fetch("./seasons.json")

    result = await response.json()

}

getSeasons()

events.forEach(el => {

            el.addEventListener('click', () => {

                let index = result.seasons[result.seasons.findIndex(ssn => ssn.seasonNumber === el.children[0].innerHTML)].events.findIndex(evt => evt.eventNumber === el.children[1].innerHTML)

                let event = result.seasons[result.seasons.findIndex(ssn => ssn.seasonNumber === el.children[0].innerHTML)].events[index]

                if(el.parentNode.children[1].classList.contains('empty') === true) {

                    el.parentNode.children[1].innerHTML = `
                        <div id="video" class="profile-info-events-list__item-detailed__video">
                            <iframe width="500" height="281" src="${event.eventVideo[event.eventVideo.findIndex(evt => evt.videoAuthor === event.eventHost)].videoLink}" title="YouTube video player" 
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                                gyroscope; picture-in-picture; web-share" allowfullscreen>
                            </iframe>
                        </div>
                        <div class="profile-info-events-list__item-detailed__desc">
                            <div class="profile-info-events-list__item-detailed__desc-item">
                                <p>Название ивента:</p>
                                <p>${event.eventTitle}</p>
                            </div>
                            <div class="profile-info-events-list__item-detailed__desc-item">
                                <p>Дата ивента:</p>
                                <p>${event.eventDate}</p>
                            </div>
                            <div class="profile-info-events-list__item-detailed__desc-item">
                                <p>Игра ивента:</p>
                                <p>${event.eventGame}</p>
                            </div>
                            <div class="profile-info-events-list__item-detailed__desc-item">
                                <p>Краткие правила:</p>
                                <p>${event.eventDescription}</p>
                            </div>
                        </div>
                        `

                }                
                        
            })
    
})