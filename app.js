const express = require("express")
const auth = require('./public/components/auth/auth')
const participants = require('./data/participant.json')
const newsList = require('./data/news.json')
const seasonsList = require('./public/seasons.json')
const events = require('./public/components/eventBlock/events')
const [header, current, news, nav, about, detailed, profile, participant, seasons, footer] = 
        [
            require('./public/components/header/header'), require('./public/components/current/current'), require('./public/components/news/news'), require('./public/components/nav/nav'),
            require('./public/components/about/about'), require('./public/components/aboutDetailed/aboutDetailed'), require('./public/components/profile/profile'), require('./public/components/participant/participant'), require('./public/components/seasons/seasons'), 
            require('./public/components/footer/footer')
            
        ]

const adminPass = '1emumuvumuzeh'

const app = express()

const urlencodedParser = express.urlencoded({extended: false})

app.use(express.static(__dirname + '/public'))

app.get('/iZ8saRlTNldVuCJpxH2i', async function(req, res){

    let startPageContent = `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Турнир - Легендарная сложность</title>
                                <link rel="stylesheet" href="/style.css">
                                <link rel="stylesheet" href="/components/header/header.css">
                                <link rel="stylesheet" href="/components/footer/footer.css">
                                <link rel="stylesheet" href="/components/auth/auth.css"
                                <link rel="stylesheet" href="/components/news/news.css">
                                <link rel="stylesheet" href="/components/nav/nav.css">
                                <link rel="stylesheet" href="/components/about/about.css">
                                <link rel="stylesheet" href="/components/participant/participant.css">
                                <link rel="stylesheet" href="/components/seasons/seasons.css">
                                <link rel="stylesheet" href="/components/eventBlock/event.css">
                                <link rel="icon" type="image/x-icon" href="/img/favicon.ico">
                                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                            </head>
                            <body>`

    let endPageContent = `<script src="/script.js"></script>
                        </body>
                    </html>`

    res.send(startPageContent + auth.auth + endPageContent)

})

app.get(['/', '/home'], async function(req, res){

    let currentResults = ``

    let players = ['DMITRY_BALE', 'Juice', 'orkpod', 'vika_karter', 'WELOVEGAMES']

    let seasonResult = []

    for(let i = 0; i < players.length; i++) {
        let pointsSum = 0
        for(let j = 0; j < seasonsList.seasons[seasonsList.seasons.length - 1].events.length; j++) {
            if(players[i] !== seasonsList.seasons[seasonsList.seasons.length - 1].events[j].eventHost) {
                if(seasonsList.seasons[seasonsList.seasons.length - 1].events[j].eventResults.findIndex(evt => evt.player === players[i]) >= 0) {
                    // console.log(players[i])
                    if(seasonsList.seasons[seasonsList.seasons.length - 1].events[j].isBonus === false) {
                        pointsSum += seasonsList.seasons[seasonsList.seasons.length - 1].rules.find(rule => rule.eventPlace === parseInt(seasonsList.seasons[seasonsList.seasons.length - 1].events[j].eventResults.find(evt => evt.player === players[i]).position)).placePoints
                    }

                    if(seasonsList.seasons[seasonsList.seasons.length - 1].events[j].isBonus === true) {
                        if(seasonsList.seasons[seasonsList.seasons.length - 1].events[j].eventResults.find(evt => evt.player === players[i]).position === '1') {
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

    let values = []

    for(let i = 0; i < seasonResult.length; i++) {

        if(values.indexOf(seasonResult[i].seasonPoints) < 0) {
            values.push(seasonResult[i].seasonPoints)
        }

    }

    values.sort((a, b) => b - a)

    for(let i = 0; i < values.length; i++) {

        for(let j = 0; j < seasonResult.length; j++) {

            if(seasonResult[j].seasonPoints === values[i]) {
                currentResults += `<div class="current-body-content__item">${i+1} место - ${seasonResult[j].playerName} (${seasonResult[j].seasonPoints})</div>`
            }

        }

    }

    let seasonNav = ``

    seasonsList.seasons.forEach(el => {

        seasonNav += `<li><a class="dropdown-item season-number" id="${el.seasonNumber}">${el.seasonNumber} сезон</a></li>`
        // el.events.forEach(elem => {
        //     events += `<div class="btn-group">
        //                     <button class="btn btn-event btn-lg season-event" type="button">
        //                         ${elem.eventNumber} выпуск
        //                     </button>
        //                     <ul class="dropdown-menu">
        //                         <li>Hello World</li>
        //                     </ul>
        //                 </div>`
        // })

    })

    let newses = ``

    if(newsList.news.length > 0) {
        
        newsList.news.forEach(el => {

            if(el.newsContent.indexOf('img') >= 0) {

                newses += `<div class="news-card">
                                <div class="news-card-body">
                                    <img class="news-card-body__image" src="${el.newsContent}">
                                </div>
                            </div>`

            } else {

                newses += `<div class="news-card">
                            <div class="news-card-header">
                                ${el.newsHeader}
                            </div>
                            <div class="news-card-body">
                                <p>${el.newsContent}</p>
                                <div class="news-card-body__date">${el.newsDate}</div>
                            </div>
                        </div>`

            }

        })

    }

    if(newsList.news.length <= 0) {

        newses += `<div class="news-card">
                        <div class="news-card-body empty-news">
                            <p>
                                Здесь пока нет новостей...
                            </p>
                        </div>
                    </div>`

    }

    let parts = ``    

    participants.participants.forEach(el => {
            parts += `  <div id=${el.id} class="part-card">
                            <div class="part-card-photo">
                                <img class="part-card-photo__image" src="${el.photo}" alt="placeholder">
                            </div>
                            <div class="part-card-content">
                                <div class="card-content__name">
                                    <h3><a href="/profile?name=${el.id}">${el.name}</a></h3>
                                </div>
                                <div class="card-content__social">`                            
            el.links.forEach(elem => {
                if(elem.isMain === true) {
                    if(elem.linkAddress.indexOf('twitch.tv') >= 0  || elem.linkAddress.indexOf('archive') >= 0) {
                        parts += `<div class="card-content__social-item">
                                        <div class="card-content__social-item-icon">
                                            <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                            <svg width="32px" height="32px" viewBox="0 0 48 48" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <style>.cls-1{fill:none;stroke:#63489d;stroke-linecap:round;stroke-linejoin:round;}
                                                    </style>
                                                </defs>
                                                <path class="cls-1" d="M31.16,12.16v8.19h2.47V12.16Zm-7.75,0v8.19H26V12.16ZM14.11,4.5,7.23,11.34l0,25.12h8.3l0,7,7.06-7H28.2L40.77,24V4.5Zm1.42,2.89H38v15.2L32.55,28H26.94l-5.12,5.13V28H15.53Z"/>
                                            </svg>
                                        </div>
                                        <div class="card-content__social-item-ref">
                                            <a href="${elem.linkAddress}" target="_blank">${elem.linkName}</a>
                                        </div>
                                    </div>`
                    }
                    if(elem.linkAddress.indexOf('boosty.to') >= 0) {
                        parts += `<div class="card-content__social-item">
                                        <div class="card-content__social-item-icon">
                                        <?xml version="1.0" encoding="utf-8"?>
                                        <!-- Generator: Adobe Illustrator 24.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                            <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" x="0px" y="0px"
                                                viewBox="0 0 235.6 292.2" style="enable-background:new 0 0 235.6 292.2;" xml:space="preserve"> 
                                            <style type="text/css">
                                                .st0{fill:#63489d;}
                                            </style>
                                            <g id="b_1_">
                                                <path class="st0" d="M44.3,164.5L76.9,51.6H127l-10.1,35c-0.1,0.2-0.2,0.4-0.3,0.6L90,179.6h24.8c-10.4,25.9-18.5,46.2-24.3,60.9
                                                    c-45.8-0.5-58.6-33.3-47.4-72.1 M90.7,240.6l60.4-86.9h-25.6l22.3-55.7c38.2,4,56.2,34.1,45.6,70.5
                                                    c-11.3,39.1-57.1,72.1-101.7,72.1C91.3,240.6,91,240.6,90.7,240.6z"/>
                                            </g>
                                            </svg>
                                        </div>
                                        <div class="card-content__social-item-ref">
                                            <a href="${elem.linkAddress}" target="_blank">${elem.linkName}</a>
                                        </div>
                                    </div>`
                    }
                    if(elem.linkAddress.indexOf('t.me') >= 0) {
                        parts += `<div class="card-content__social-item">
                                        <div class="card-content__social-item-icon">
                                        <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.997 12C21.997 17.5228 17.5198 22 11.997 22C6.47415
                                                    22 1.99699 17.5228 1.99699 12C1.99699 6.47715 6.47415 2 11.997 2C17.5198 2 21.997 6.47715 21.997 12ZM12.3553 
                                                    9.38244C11.3827 9.787 9.43876 10.6243 6.52356 11.8944C6.05018 12.0827 5.8022 12.2669 5.77962 12.4469C5.74147 
                                                    12.7513 6.12258 12.8711 6.64155 13.0343C6.71214 13.0565 6.78528 13.0795 6.86026 13.1038C7.37085 13.2698 8.05767 
                                                    13.464 8.41472 13.4717C8.7386 13.4787 9.10009 13.3452 9.49918 13.0711C12.2229 11.2325 13.629 10.3032 13.7172 10.2831C13.7795 
                                                    10.269 13.8658 10.2512 13.9243 10.3032C13.9828 10.3552 13.977 10.4536 13.9708 10.48C13.9331 10.641 12.4371 12.0318 
                                                    11.6629 12.7515C11.4216 12.9759 11.2504 13.135 11.2154 13.1714C11.137 13.2528 11.0571 13.3298 10.9803 13.4038C10.506 
                                                    13.8611 10.1502 14.204 11 14.764C11.4083 15.0331 11.7351 15.2556 12.0611 15.4776C12.4171 15.7201 12.7722 15.9619 13.2317 
                                                    16.2631C13.3487 16.3398 13.4605 16.4195 13.5694 16.4971C13.9837 16.7925 14.3559 17.0579 14.8158 17.0155C15.083 16.991 15.359 
                                                    16.7397 15.4992 15.9903C15.8305 14.2193 16.4817 10.382 16.6322 8.80081C16.6454 8.66228 16.6288 8.48498 16.6154 8.40715C16.6021 
                                                    8.32932 16.5743 8.21842 16.4731 8.13633C16.3533 8.03911 16.1683 8.01861 16.0856 8.02C15.7095 8.0267 15.1324 8.22735 12.3553 
                                                    9.38244Z" stroke="#63489d" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        <div class="card-content__social-item-ref">
                                            <a href="${elem.linkAddress}" target="_blank">${elem.linkName}</a>
                                        </div>
                                    </div>`
                    }
                    if(elem.linkAddress.indexOf('vk.com') >= 0) {
                        parts += `<div class="card-content__social-item">
                                        <div class="card-content__social-item-icon">
                                        <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4 3.4C2 4.81333 2 7.07333 2 11.6V12.4C2 16.92 2 
                                                    19.18 3.4 20.6C4.81333 22 7.07333 22 11.6 22H12.4C16.92 22 19.18 22 20.6 20.6C22 19.1867 22 16.9267 22 
                                                    12.4V11.6C22 7.08 22 4.82 20.6 3.4C19.1867 2 16.9267 2 12.4 2H11.6C7.08 2 4.82 2 3.4 3.4ZM5.37333 8.08667C5.48 
                                                    13.2867 8.08 16.4067 12.64 16.4067H12.9067V13.4333C14.58 13.6 15.8467 14.8267 16.3533 16.4067H18.72C18.4773 
                                                    15.5089 18.0469 14.6727 17.4574 13.9533C16.8679 13.234 16.1326 12.6478 15.3 12.2333C16.0461 11.779 16.6905 
                                                    11.1756 17.1929 10.461C17.6953 9.7464 18.045 8.93585 18.22 8.08H16.0733C15.6067 9.73334 14.22 11.2333 12.9067 
                                                    11.3733V8.08667H10.7533V13.8467C9.42 13.5133 7.74 11.9 7.66666 8.08667H5.37333Z" fill="#63489d"/>
                                            </svg>
                                        </div>
                                        <div class="card-content__social-item-ref">
                                            <a href="${elem.linkAddress}" target="_blank">${elem.linkName}</a>
                                        </div>
                                    </div>`
                    }
                    if(elem.linkAddress.indexOf('youtube.com') >= 0) {
                        parts += `<div class="card-content__social-item">
                                        <div class="card-content__social-item-icon">
                                        <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                        <svg width="28px" height="28px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.168 19.0028C20.4724 19.0867 22.41 17.29 22.5 14.9858V9.01982C22.41 6.71569 20.4724 4.91893 18.168 5.00282H6.832C4.52763 4.91893 2.58998 6.71569 2.5 9.01982V14.9858C2.58998 17.29 4.52763 19.0867 6.832 19.0028H18.168Z" stroke="#63489d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.008 9.17784L15.169 11.3258C15.3738 11.4454 15.4997 11.6647 15.4997 11.9018C15.4997 12.139 15.3738 12.3583 15.169 12.4778L12.008 14.8278C11.408 15.2348 10.5 14.8878 10.5 14.2518V9.75184C10.5 9.11884 11.409 8.77084 12.008 9.17784Z" stroke="#63489d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        </div>
                                        <div class="card-content__social-item-ref">
                                            <a href="${elem.linkAddress}" target="_blank">${elem.linkName}</a>
                                        </div>
                                    </div>`
                    }
                    if(elem.linkAddress.indexOf('discord.com') >= 0) {

                        parts += `<div class="card-content__social-item">
                                        <div class="card-content__social-item-icon">
                                        <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                        <svg width="32px" height="32px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <style>.a{fill:none;stroke:#63489d;stroke-linecap:round;stroke-linejoin:round;}
                                                </style>
                                            </defs>
                                            <path class="a" d="M17.59,34.1733c-.89,1.3069-1.8944,2.6152-2.91,3.8267C7.3,37.79,4.5,33,4.5,33A44.83,44.83,0,0,1,9.31,13.48,16.47,16.47,0,0,1,18.69,10l1,2.31A32.6875,32.6875,0,0,1,24,12a32.9643,32.9643,0,0,1,4.33.3l1-2.31a16.47,16.47,0,0,1,9.38,3.51A44.8292,44.8292,0,0,1,43.5,33s-2.8,4.79-10.18,5a47.4193,47.4193,0,0,1-2.86-3.81m6.46-2.9c-3.84,1.9454-7.5555,3.89-12.92,3.89s-9.08-1.9446-12.92-3.89"/>
                                                <circle class="a" cx="17.847" cy="26.23" r="3.35"/><circle class="a" cx="30.153" cy="26.23" r="3.35"/>
                                        </svg>
                                        </div>
                                        <div class="card-content__social-item-ref">
                                            <a href="${elem.linkAddress}" target="_blank">${elem.linkName}</a>
                                        </div>
                                    </div>`

                    }

                }

            })
            parts += `</div>
                    </div>
                </div>`
                
        
    })

    res.send(header.header + nav.nav + current.current(seasonsList.seasons.length, currentResults, seasonsList.seasons[seasonsList.seasons.length - 1].events.length, seasonsList.seasons[seasonsList.seasons.length-1].events.findIndex(evt => evt.isBonus === true)+1) + news.news(newses) + about.about + participant.participant(parts) + footer.footer)
})

app.get ('/detailed', async function(req, res){

    res.send(header.header + nav.nav + detailed.detailed + footer.footer)

})

app.get('/profile', async function(req, res){

    let profileInfo = `<div class="profile-info-headers">
                            <h3>${participants.participants[participants.participants.findIndex(prt => prt.id === req.query.name)].name}</h3>
                            <h3>Ссылки:</h3>
                            <h3>Статистика</h3>
                        </div>`

    profileInfo += `
                    <div class="profile-info-contacts">                        
                        <div class="profile-info-contacts__image">
                            <h3>${participants.participants[participants.participants.findIndex(prt => prt.id === req.query.name)].name}</h3>
                            <img src="${participants.participants[participants.participants.findIndex(prt => prt.id === req.query.name)].photo}">
                        </div>                        
                        <div class="profile-info-contacts__links">
                            <h3>Ссылки</h3>`
                            

    participants.participants[participants.participants.findIndex(prt => prt.id === req.query.name)].links.forEach(el => {

        if(el.linkAddress.indexOf('twitch.tv') >= 0  || el.linkAddress.indexOf('archive') >= 0) {
            profileInfo += `<div class="profile-info-contacts__links-item">
                                <div class="profile-info-contacts__links-item__svg">
                                    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                    <svg width="32px" height="32px" viewBox="0 0 48 48" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <style>.cls-1{fill:none;stroke:#63489d;stroke-linecap:round;stroke-linejoin:round;}
                                                @media screen and (min-width: 320px) and (max-width: 480px) {

                                                    #Layer_2 {
                                                        width: 24px;
                                                        height: 24px;
                                                    }

                                                }

                                                @media screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {

                                                    #Layer_2 {
                                                        width: 24px;
                                                        height: 24px;
                                                    }

                                                }
                                            </style>
                                        </defs>
                                        <path class="cls-1" d="M31.16,12.16v8.19h2.47V12.16Zm-7.75,0v8.19H26V12.16ZM14.11,4.5,7.23,11.34l0,25.12h8.3l0,7,7.06-7H28.2L40.77,24V4.5Zm1.42,2.89H38v15.2L32.55,28H26.94l-5.12,5.13V28H15.53Z"/>
                                    </svg>
                                </div>
                                <div class="profile-info-contacts__links-item__link">
                                    <a href="${el.linkAddress}">${el.linkName}</a>
                                </div>
                            </div>`
        }
        if(el.linkAddress.indexOf('boosty') >= 0) {
            profileInfo += `<div class="profile-info-contacts__links-item">
                                <div class="profile-info-contacts__links-item__svg">
                                    <?xml version="1.0" encoding="utf-8"?>
                                    <!-- Generator: Adobe Illustrator 24.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                        <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" x="0px" y="0px"
                                            viewBox="0 0 235.6 292.2" style="enable-background:new 0 0 235.6 292.2;" xml:space="preserve"> 
                                        <style type="text/css">
                                            .st0{fill:#63489d;}

                                            @media screen and (min-width: 320px) and (max-width: 480px) {

                                                #Слой_1 {
                                                    width: 24px;
                                                    height: 24px;
                                                }

                                            }

                                            @media screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {

                                                #Слой_1 {
                                                    width: 24px;
                                                    height: 24px;
                                                }

                                            }

                                        </style>
                                        <g id="b_1_">
                                            <path class="st0" d="M44.3,164.5L76.9,51.6H127l-10.1,35c-0.1,0.2-0.2,0.4-0.3,0.6L90,179.6h24.8c-10.4,25.9-18.5,46.2-24.3,60.9
                                                c-45.8-0.5-58.6-33.3-47.4-72.1 M90.7,240.6l60.4-86.9h-25.6l22.3-55.7c38.2,4,56.2,34.1,45.6,70.5
                                                c-11.3,39.1-57.1,72.1-101.7,72.1C91.3,240.6,91,240.6,90.7,240.6z"/>
                                        </g>
                                        </svg>
                                </div>
                                <div class="profile-info-contacts__links-item__link">
                                    <a href="${el.linkAddress}">${el.linkName}</a>
                                </div>
                            </div>`
        }
        if(el.linkAddress.indexOf('vk.com') >= 0) {
            profileInfo += `<div class="profile-info-contacts__links-item">
                                <div class="profile-info-contacts__links-item__svg">
                                    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                    <svg width="30px" height="30px" id="Layer_0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4 3.4C2 4.81333 2 7.07333 2 11.6V12.4C2 16.92 2 19.18 3.4 20.6C4.81333 
                                        22 7.07333 22 11.6 22H12.4C16.92 22 19.18 22 20.6 20.6C22 19.1867 22 16.9267 22 12.4V11.6C22 7.08 22 4.82 20.6 3.4C19.1867 
                                        2 16.9267 2 12.4 2H11.6C7.08 2 4.82 2 3.4 3.4ZM5.37333 8.08667C5.48 13.2867 8.08 16.4067 12.64 16.4067H12.9067V13.4333C14.58 
                                        13.6 15.8467 14.8267 16.3533 16.4067H18.72C18.4773 15.5089 18.0469 14.6727 17.4574 13.9533C16.8679 13.234 16.1326 12.6478 15.3 
                                        12.2333C16.0461 11.779 16.6905 11.1756 17.1929 10.461C17.6953 9.7464 18.045 8.93585 18.22 8.08H16.0733C15.6067 9.73334 14.22 
                                        11.2333 12.9067 11.3733V8.08667H10.7533V13.8467C9.42 13.5133 7.74 11.9 7.66666 8.08667H5.37333Z" fill="#63489d"/>
                                        <style>

                                            @media screen and (min-width: 320px) and (max-width: 480px) {

                                                #Layer_0 {
                                                    width: 16px;
                                                    height: 16px;
                                                }

                                            }

                                            @media screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {

                                                #Layer_0 {
                                                    width: 22px;
                                                    height: 22px;
                                                }

                                            }

                                        </style>
                                    </svg>
                                </div>
                                <div class="profile-info-contacts__links-item__link">
                                    <a href="${el.linkAddress}">${el.linkName}</a>
                                </div>
                            </div>`
        }
        if(el.linkAddress.indexOf('youtube') >= 0) {
            profileInfo += `<div class="profile-info-contacts__links-item">
                                <div class="profile-info-contacts__links-item__svg">
                                    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                    <svg width="28px" height="28px" id="Layer_0" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <style>

                                        @media screen and (min-width: 320px) and (max-width: 480px) {

                                            #Layer_0 {
                                                width: 16px;
                                                height: 16px;
                                            }

                                        }                                        

                                        @media screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {

                                            #Layer_0 {
                                                width: 16px;
                                                height: 16px;
                                            }

                                        }

                                    </style>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.168 19.0028C20.4724 19.0867 22.41 17.29 22.5 14.9858V9.01982C22.41 6.71569 20.4724 4.91893 18.168 5.00282H6.832C4.52763 4.91893 2.58998 6.71569 2.5 9.01982V14.9858C2.58998 17.29 4.52763 19.0867 6.832 19.0028H18.168Z" stroke="#63489d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.008 9.17784L15.169 11.3258C15.3738 11.4454 15.4997 11.6647 15.4997 11.9018C15.4997 12.139 15.3738 12.3583 15.169 12.4778L12.008 14.8278C11.408 15.2348 10.5 14.8878 10.5 14.2518V9.75184C10.5 9.11884 11.409 8.77084 12.008 9.17784Z" stroke="#63489d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div class="profile-info-contacts__links-item__link">
                                    <a href="${el.linkAddress}">${el.linkName}</a>
                                </div>
                            </div>`
        }
        if(el.linkAddress.indexOf('t.me') >= 0) {
            profileInfo += `<div class="profile-info-contacts__links-item">
                                <div class="profile-info-contacts__links-item__svg">
                                    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                    <svg width="30px" height="30px" id="Layer_0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <style>

                                            @media screen and (min-width: 320px) and (max-width: 480px) {

                                                #Layer_0 {
                                                    width: 16px;
                                                    height: 16px;
                                                }

                                            }

                                            @media screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {

                                                #Layer_0 {
                                                    width: 16px;
                                                    height: 16px;
                                                }

                                            }

                                        </style>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.997 12C21.997 17.5228 17.5198 22 11.997 22C6.47415 22 1.99699 17.5228 1.99699 12C1.99699 6.47715 6.47415 2 11.997 2C17.5198 2 21.997 6.47715 21.997 12ZM12.3553 9.38244C11.3827 9.787 9.43876 10.6243 6.52356 11.8944C6.05018 12.0827 5.8022 12.2669 5.77962 12.4469C5.74147 12.7513 6.12258 12.8711 6.64155 13.0343C6.71214 13.0565 6.78528 13.0795 6.86026 13.1038C7.37085 13.2698 8.05767 13.464 8.41472 13.4717C8.7386 13.4787 9.10009 13.3452 9.49918 13.0711C12.2229 11.2325 13.629 10.3032 13.7172 10.2831C13.7795 10.269 13.8658 10.2512 13.9243 10.3032C13.9828 10.3552 13.977 10.4536 13.9708 10.48C13.9331 10.641 12.4371 12.0318 11.6629 12.7515C11.4216 12.9759 11.2504 13.135 11.2154 13.1714C11.137 13.2528 11.0571 13.3298 10.9803 13.4038C10.506 13.8611 10.1502 14.204 11 14.764C11.4083 15.0331 11.7351 15.2556 12.0611 15.4776C12.4171 15.7201 12.7722 15.9619 13.2317 16.2631C13.3487 16.3398 13.4605 16.4195 13.5694 16.4971C13.9837 16.7925 14.3559 17.0579 14.8158 17.0155C15.083 16.991 15.359 16.7397 15.4992 15.9903C15.8305 14.2193 16.4817 10.382 16.6322 8.80081C16.6454 8.66228 16.6288 8.48498 16.6154 8.40715C16.6021 8.32932 16.5743 8.21842 16.4731 8.13633C16.3533 8.03911 16.1683 8.01861 16.0856 8.02C15.7095 8.0267 15.1324 8.22735 12.3553 9.38244Z" stroke="#63489d" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div class="profile-info-contacts__links-item__link">
                                    <a href="${el.linkAddress}">${el.linkName}</a>
                                </div>
                            </div>`
        }
        if(el.linkAddress.indexOf('discord.com') >= 0) {

            profileInfo += `<div class="profile-info-contacts__links-item">
                                <div class="profile-info-contacts__links-item__svg">
                                <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                <svg width="30px" height="30px" id="Layer_0" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <style>.a{fill:none;stroke:#63489d;stroke-linecap:round;stroke-linejoin:round;}
                                        </style>
                                    </defs>
                                    <path class="a" d="M17.59,34.1733c-.89,1.3069-1.8944,2.6152-2.91,3.8267C7.3,37.79,4.5,33,4.5,33A44.83,44.83,0,0,1,9.31,13.48,16.47,16.47,0,0,1,18.69,10l1,2.31A32.6875,32.6875,0,0,1,24,12a32.9643,32.9643,0,0,1,4.33.3l1-2.31a16.47,16.47,0,0,1,9.38,3.51A44.8292,44.8292,0,0,1,43.5,33s-2.8,4.79-10.18,5a47.4193,47.4193,0,0,1-2.86-3.81m6.46-2.9c-3.84,1.9454-7.5555,3.89-12.92,3.89s-9.08-1.9446-12.92-3.89"/>
                                    <circle class="a" cx="17.847" cy="26.23" r="3.35"/>
                                    <circle class="a" cx="30.153" cy="26.23" r="3.35"/>
                                </svg>
                                </div>
                                <div class="profile-info-contacts__links-item__link">
                                    <a href="${el.linkAddress}">${el.linkName}</a>
                                </div>
                            </div>`

        }
        
    })
                        
    profileInfo += `</div>`

    let players = ['DMITRY_BALE', 'Juice', 'orkpod', 'vika_karter', 'WELOVEGAMES']

    let seasons = []

    let seasonResult = []

    for(let k = 0; k < seasonsList.seasons.length; k++) {
        seasonResult = []
        for(let i = 0; i < players.length; i++) {
            playerName = players[i]
            let pointsSum = 0
            for(let j = 0; j < seasonsList.seasons[k].events.length; j++) {
                if(players[i] !== seasonsList.seasons[k].events[j].eventHost) {
                    if(seasonsList.seasons[k].events[j].eventResults.findIndex(evt => evt.player === players[i]) >= 0) {
                        // console.log(players[i])
                        if(seasonsList.seasons[k].events[j].isBonus === false) {
                            pointsSum += seasonsList.seasons[k].rules.find(rule => rule.eventPlace === parseInt(seasonsList.seasons[k].events[j].eventResults.find(evt => evt.player === players[i]).position)).placePoints
                        }

                        if(seasonsList.seasons[k].events[j].isBonus === true) {
                            if(seasonsList.seasons[k].events[j].eventResults.find(evt => evt.player === players[i]).position === '1') {
                                pointsSum += 1
                            }
                        }
                    }
                }
            }

            seasonResult.push({
                seasonNumber: k+1,
                playerName: players[i],
                seasonPoints: pointsSum
            })

        }

        seasons.push(seasonResult)

    }

    let values = []

    for(let j = 0; j < seasons.length; j++) {
        let value = []
        for(let i = 0; i < seasons[j].length; i++) {

            if(value.indexOf(seasons[j][i].seasonPoints) < 0) {
                value.push(seasons[j][i].seasonPoints)
            }

        }
        value.sort((a, b) => b - a)
        values.push(value)
    }

    profileInfo += `        
        <div class="profile-info-achivements">
            <h3>Статистика</h3>
    `

    profileInfo += `<div class="profile-info-achivements__season-header">
                        <h3>Сезоны</h3>
                    </div>
                    <div class="profile-info-achivements__season-item-header">
                        <h4></h4>
                        <h4>Сезон</h4>
                        <h4>Место</h4>
                        <h4>Баллы</h4>
                    </div>`

    let events = 0

    seasons.forEach(elem => {
        elem.forEach(el => {
            if(el.playerName === req.query.name) {
                if(values[seasons.indexOf(elem)].indexOf(el.seasonPoints)+1 === 1) {
                    profileInfo += `
                        <div class="profile-info-achivements__season-item">
                            <div class="profile-info-achivements__season-item-medal">
                                <img src="/img/medals/gold.png" alt="золото">
                            </div>
                            <p>${el.seasonNumber} сезон</p>
                            <p>${values[seasons.indexOf(elem)].indexOf(el.seasonPoints)+1} место</p>
                            <p>${el.seasonPoints}</p>
                        </div>
                    `
                }

                if(values[seasons.indexOf(elem)].indexOf(el.seasonPoints)+1 === 2) {
                    profileInfo += `
                        <div class="profile-info-achivements__season-item">
                            <div class="profile-info-achivements__season-item-medal">
                                <img src="/img/medals/silver.png" alt="серебро">
                            </div>
                            <p>${el.seasonNumber} сезон</p>
                            <p>${values[seasons.indexOf(elem)].indexOf(el.seasonPoints)+1} место</p>
                            <p>${el.seasonPoints}</p>
                        </div>
                    `
                }

                if(values[seasons.indexOf(elem)].indexOf(el.seasonPoints)+1 === 3) {
                    profileInfo += `
                        <div class="profile-info-achivements__season-item">
                            <div class="profile-info-achivements__season-item-medal">
                                <img src="/img/medals/bronze.png" alt="бронза">
                            </div>
                            <p>${el.seasonNumber} сезон</p>
                            <p>${values[seasons.indexOf(elem)].indexOf(el.seasonPoints)+1} место</p>
                            <p>${el.seasonPoints}</p>
                        </div>
                    `
                }

                if(values[seasons.indexOf(elem)].indexOf(el.seasonPoints)+1 === 4 || values[seasons.indexOf(elem)].indexOf(el.seasonPoints)+1 === 5) {
                    profileInfo += `
                        <div class="profile-info-achivements__season-item">
                            <div class="profile-info-achivements__season-item-medal">
                                <img src="/img/medals/wood.png" alt="дерево">
                            </div>
                            <p>${el.seasonNumber} сезон</p>
                            <p>${values[seasons.indexOf(elem)].indexOf(el.seasonPoints)+1} место</p>
                            <p>${el.seasonPoints}</p>
                        </div>
                    `
                }
            }
        })
    })

    seasonsList.seasons.forEach(el => {
        events += el.events.length
    })

    let eventResult = []

    for(let i = 0; i < players.length; i++) {
        let places = []
        for(let j = 0; j < seasonsList.seasons.length; j++) {
            for(let k = 0; k < seasonsList.seasons[j].events.length; k++) {
                if(seasonsList.seasons[j].events[k].eventResults.findIndex(res => res.player === players[i]) >= 0) {
                    places.push(seasonsList.seasons[j].events[k].eventResults[seasonsList.seasons[j].events[k].eventResults.findIndex(res => res.player === players[i])].position)
                }
            }
        }

        eventResult.push({
            playerName: players[i],
            places: places
        })

    }

    let placeResult = []

    let placeStat = []

    for(let i = 0; i < eventResult.length; i++) {                    
        placeStat = []
        for(let j = 0; j <eventResult[i].places.length; j++) {
            if(placeStat.findIndex(item => item.placeValue === eventResult[i].places[j]) < 0) {
                placeStat.push({
                    placeValue: eventResult[i].places[j],
                    placeCount: 1
                })
            } else {
                placeStat[placeStat.findIndex(item => item.placeValue === eventResult[i].places[j])].placeCount++
            }
        }
        
            
        placeResult.push({
            player: eventResult[i].playerName,
            stat: placeStat
        })

    }

    // placeResult.forEach(el => {
    //     console.log(el.player)
    //     console.log(el.stat)
    // })

    profileInfo += `<div class="profile-info-achivements__event-header">
                        <h3>Достижения</h3>
                    </div>`
    let maxIndex = placeResult[placeResult.findIndex(item => item.player === req.query.name)].stat.reduce((acc, curr, i) => placeResult[placeResult.findIndex(item => item.player === req.query.name)].stat[acc].placeCount > curr.placeCount ? acc : i, 0)

    profileInfo += `<div class="profile-info-achivements__event-item">
                        <p>Самое часто занимаемое место в выпусках - </p><p><b>${placeResult[placeResult.findIndex(item => item.player === req.query.name)].stat[maxIndex].placeValue} место</b></p>
                    </div>`

    if(placeResult[placeResult.findIndex(item => item.player === req.query.name)].stat.findIndex(item => item.placeValue == 1) >= 0) {

        profileInfo += `<div class="profile-info-achivements__event-item">
                            <p>Общее количество&nbsp<b>побед</b></p><p><b>${placeResult[placeResult.findIndex(item => item.player === req.query.name)].stat.find(item => item.placeValue == 1).placeCount} из ${events}</b></p>
                        </div>`

    }

    if(placeResult[placeResult.findIndex(item => item.player === req.query.name)].stat.findIndex(item => item.placeValue == 1) < 0) {

        profileInfo += `<div class="profile-info-achivements__event-item">
                            <p>Общее количество&nbsp<b>побед</b></p><p><b>0 из ${events}</b></p>
                        </div>`

    }                    

    profileInfo += `</div>
                </div>`



    profileInfo += `<div class="profile-info-events">
                        <div class="profile-info-events-header">
                            <h3>Проведенные выпуски</h3>
                        </div>
                        <div class="profile-info-events-list">
                            <div class="profile-info-events-list-headers">
                                <h3>Сезон</h3>
                                <h3>Выпуск</h3>
                                <h3>Дата</h3>
                                <h3>Игра</h3>
                            </div>`

    seasonsList.seasons.forEach(el => {
        el.events.forEach(elem => {
            if(elem.eventHost === req.query.name) {
            //     if(elem.eventVideo.findIndex(evt => evt.videoAuthor === req.query.name) >= 0) {
            //         profileInfo += `
            //             <div class="profile-info-events-list__item">
            //                 <div class="profile-info-events-list__item-video">
            //                     <iframe width="560" height="281" src="${elem.eventVideo[elem.eventVideo.findIndex(evt => evt.videoAuthor === req.query.name)].videoLink}" title="YouTube video player" 
            //                         frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
            //                         gyroscope; picture-in-picture; web-share" allowfullscreen>
            //                     </iframe>
            //                 </div>
            //             </div>
            //         `
            //     }
            //     if(elem.eventVideo.findIndex(evt => evt.videoAuthor === req.query.name) < 0) {
            //         profileInfo += `
            //             <div class="profile-info-events-list__item">
            //                 <div class="profile-info-events-list__item-video">
            //                     <iframe width="560" height="281" src="${elem.eventVideo[0].videoLink}" title="YouTube video player" 
            //                         frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
            //                         gyroscope; picture-in-picture; web-share" allowfullscreen>
            //                     </iframe>
            //                 </div>
            //             </div>
            //         `
            //     }
            

                profileInfo += `
                    <div class="profile-info-events-list__item">
                        <div id="event" class="profile-info-events-list__item-info">
                            <h3>${el.seasonNumber}</h3>
                            <h3>${elem.eventNumber}</h3>
                            <h3>${elem.eventDate}</h3>
                            <h3>${elem.eventGame}</h3>
                        </div>
                        <div class="profile-info-events-list__item-detailed hide">
                        </div>
                    </div>
                `

            }

        })
    })

    profileInfo += `</div>
                </div>`

    profileInfo += `
                <script src="profile.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </body>
        </html>
    `

    res.send(header.header + nav.nav + profile.profile(req.query.name, profileInfo))

})

app.get('/seasons', async function(req, res){

    if(req.query.season === undefined && req.query.event === undefined) {

        let seasonNav = ``

        seasonsList.seasons.forEach(el => {

            seasonNav += `<li><a class="seasons-header__text season-number" id="${el.seasonNumber}">${el.seasonNumber} сезон</a></li>`
            // el.events.forEach(elem => {
            //     events += `<div class="btn-group">
            //                     <button class="btn btn-event btn-lg season-event" type="button">
            //                         ${elem.eventNumber} выпуск
            //                     </button>
            //                     <ul class="dropdown-menu">
            //                         <li>Hello World</li>
            //                     </ul>
            //                 </div>`
            // })

        })

        res.send(header.header + nav.nav + seasons.seasons(seasonNav, '') + events.eventBlock('') + footer.footer)

    }

    if(req.query.season !== undefined && req.query.event !== undefined) {

        function getRandomInt(min, max) {

            let rand = min + Math.random() * (max + 1 - min)
            return Math.floor(rand)
        
        }

        let players = ['DMITRY_BALE', 'Juice', 'orkpod', 'vika_karter', 'WELOVEGAMES']

        let seasonNav = ``

        seasonsList.seasons.forEach(el => {
            if(el.seasonNumber === req.query.season) {

                seasonNav += `<li><a class="seasons-header__text season-number" style="color: #9772ab;" id="${el.seasonNumber}">${el.seasonNumber} сезон</a></li>`

            }
            if(el.seasonNumber !== req.query.season) {

                seasonNav += `<li><a class="seasons-header__text season-number" id="${el.seasonNumber}">${el.seasonNumber} сезон</a></li>`

            }
        })

        let content = ``

        seasonsList.seasons[req.query.season - 1].events.forEach(el => {

            if(el.isBonus === true) {

                if(el.eventNumber === req.query.event) {

                    content += `<div class="btn-group">
                                    <button class="btn btn-event btn-lg season-event season-event-active" id="${el.eventNumber}" type="button">
                                        ${el.eventNumber} выпуск (бонусный)
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>Hello World</li>
                                    </ul>
                                </div>`

                } else {

                    content += `<div class="btn-group">
                                    <button class="btn btn-event btn-lg season-event" id="${el.eventNumber}" type="button">
                                        ${el.eventNumber} выпуск (бонусный)
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>Hello World</li>
                                    </ul>
                                </div>`

                }

            } else {

                if(el.eventNumber === req.query.event) {

                    content += `<div class="btn-group">
                                    <button class="btn btn-event btn-lg season-event season-event-active" id="${el.eventNumber}" type="button">
                                        ${el.eventNumber} выпуск
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>Hello World</li>
                                    </ul>
                                </div>`

                } else {

                    content += `<div class="btn-group">
                                    <button class="btn btn-event btn-lg season-event" id="${el.eventNumber}" type="button">
                                        ${el.eventNumber} выпуск
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>Hello World</li>
                                    </ul>
                                </div>`

                }

            }

        })

        let eventContent = ``

        let seasonResult = [
        ]
        let event = seasonsList.seasons[req.query.season - 1].events.find(evt => evt.eventNumber === req.query.event)
        let index = seasonsList.seasons[req.query.season - 1].events.indexOf(event)

            for(let i = 0; i < players.length; i++) {
                let pointsSum = 0
                for(let j = 0; j <= index; j++) {
                    if(players[i] !== seasonsList.seasons[req.query.season - 1].events[j].eventHost) {
                        if(seasonsList.seasons[req.query.season - 1].events[j].eventResults.findIndex(evt => evt.player === players[i]) >= 0) {
                            if(seasonsList.seasons[req.query.season - 1].events[j].isBonus === false) {
                                pointsSum += seasonsList.seasons[req.query.season - 1].rules.find(rule => rule.eventPlace === parseInt(seasonsList.seasons[req.query.season - 1].events[j].eventResults.find(evt => evt.player === players[i]).position)).placePoints
                            }
                            if(seasonsList.seasons[req.query.season - 1].events[j].isBonus === true) {
                                if(seasonsList.seasons[req.query.season - 1].events[j].eventResults.find(evt => evt.player === players[i]).position === '1') {
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

        for(let i = 0; i < values.length; i++) {

            for(let j = 0; j < seasonResult.length; j++) {

                if(seasonResult[j].seasonPoints === values[i]) {
                    seasonResultsContent += `<div class="season-results-item">${i+1} место - ${seasonResult[j].playerName} (${seasonResult[j].seasonPoints})</div>`
                }

            }

        }

        if(event.eventVideo.findIndex(evt => evt.videoAuthor === event.eventHost) >= 0) {

            eventContent += `
                <div class="event-body-item">
                    <div class="event-body-item__video">
                        <iframe width="500" height="281" src="${event.eventVideo[event.eventVideo.findIndex(evt => evt.videoAuthor === event.eventHost)].videoLink}" title="YouTube video player" 
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                            gyroscope; picture-in-picture; web-share" allowfullscreen>
                        </iframe>
                    </div>
                    <div class="event-body-item__tabs">
            `

            event.eventVideo.forEach(el => {
                if(el.videoAuthor === event.eventHost) {
                    eventContent += `
                        <button class="tabs-button active" id="${el.videoAuthor}">
                            ${el.videoAuthor}
                        </button>
                    `
                }
                if(el.videoAuthor !== event.eventHost) {
                    eventContent += `
                        <button class="tabs-button" id="${el.videoAuthor}">
                            ${el.videoAuthor}
                        </button>
                    `
                }
            })

            eventContent += `
                    </div>
                </div>
            `

        }

        if(event.eventVideo.findIndex(evt => evt.videoAuthor === event.eventHost) < 0) {

            let index = getRandomInt(0, event.eventVideo.length - 1)

            eventContent += `
                <div class="event-body-item">
                    <div class="event-body-item__video">
                        <iframe width="560" height="281" src="${event.eventVideo[index].videoLink}" title="YouTube video player" 
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                            gyroscope; picture-in-picture; web-share" allowfullscreen>
                        </iframe>
                    </div>
                    <div class="event-body-item__tabs">
            `

            event.eventVideo.forEach(el => {
                if(el.videoAuthor === event.eventVideo[index].videoAuthor) {
                    eventContent += `
                        <button class="tabs-button active" id="${el.videoAuthor}">
                            ${el.videoAuthor}
                        </button>
                    `
                }
                if(el.videoAuthor !== event.eventVideo[index].videoAuthor) {
                    eventContent += `
                        <button class="tabs-button" id="${el.videoAuthor}">
                            ${el.videoAuthor}
                        </button>
                    `
                }
            })

            eventContent += `
                    </div>
                </div>
            `

        }
        
        let [firstPlace, secondPlace, thirdPlace, fourthPlace] = [event.eventResults.find(evt => evt.position === "1"), event.eventResults.find(evt => evt.position === "2"), event.eventResults.find(evt => evt.position === "3"), event.eventResults.find(evt => evt.position === "4")]
        let [firstPlaceRule, secondPlaceRule, thirdPlaceRule, fourthPlaceRule] = [seasonsList.seasons[req.query.season - 1].rules.find(rule => rule.eventPlace === 1), seasonsList.seasons[req.query.season - 1].rules.find(rule => rule.eventPlace === 2), seasonsList.seasons[req.query.season - 1].rules.find(rule => rule.eventPlace === 3), seasonsList.seasons[req.query.season - 1].rules.find(rule => rule.eventPlace === 4)]

        if(event.eventResults.findIndex(evt => evt.position === "-") >= 0) {

            eventContent += `
                        <div class="event-body-item text-block">
                            <div class="text-block-item">
                                <p>Ведущий:</p>
                                <p><a href="/profile?name=${event.eventHost}">${event.eventHost}</a></p>
                            </div>
                            <div class="text-block-item">
                                <p>Игра:</p>
                                <p>${event.eventGame}</p>
                            </div>
                            <div class="text-block-item">
                                <p>Название выпуска:</p>
                                <p>${event.eventTitle}</p>
                            </div>
                            <div class="text-block-item">
                                <p>Дата выпуска:</p>
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
                                    ${event.eventResults[0].player} - (-)
                                </div>
                                <div class="event-results-item">
                                    ${event.eventResults[1].player} - (-)
                                </div>
                                <div class="event-results-item">
                                    ${event.eventResults[2].player} - (-)
                                </div>
                                <div class="event-results-item">
                                    ${event.eventResults[3].player} - (-)
                                </div>
                            </div>`

                        eventContent += `<div class="event-replays">
                                        <h4>ЗАПИСИ</h4>
                                        <div class="event-replays-body">`

                        event.eventRecords.forEach(el => {
                            eventContent += `<div class="event-replays-body__item">
                                            <a class="event-replays-body__item-link" href="${el.videoLink}">${el.videoAuthor}</a>
                                        </div>`
                        })
                                        
                        eventContent += `</div>
                                </div>`

        }

        if(fourthPlace !== undefined && thirdPlace !== undefined) {

            eventContent += `
                        <div class="event-body-item text-block">
                            <div class="text-block-item">
                                <p>Ведущий:</p>
                                <p><a href="/profile?name=${event.eventHost}">${event.eventHost}</a></p>
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

                        eventContent += `<div class="event-replays">
                                        <h4>ЗАПИСИ</h4>
                                        <div class="event-replays-body">`

                        event.eventRecords.forEach(el => {
                            eventContent += `<div class="event-replays-body__item">
                                            <a class="event-replays-body__item-link" href="${el.videoLink}">${el.videoAuthor}</a>
                                        </div>`
                        })
                                        
                        eventContent += `</div>
                                </div>`

        }

        if(fourthPlace === undefined && thirdPlace !== undefined) {

            eventContent += `
                        <div class="event-body-item text-block">
                            <div class="text-block-item">
                                <p>Ведущий:</p>
                                <p><a href="/profile?name=${event.eventHost}">${event.eventHost}</a></p>
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
                        
                        eventContent += `<div class="event-replays">
                                        <h4>ЗАПИСИ</h4>
                                        <div class="event-replays-body">`

                        event.eventRecords.forEach(el => {
                            eventContent += `<div class="event-replays-body__item">
                                            <a class="event-replays-body__item-link" href="${el.videoLink}">${el.videoAuthor}</a>
                                        </div>`
                        })
                                        
                        eventContent += `</div>
                                </div>`

        }

        if(fourthPlace === undefined && thirdPlace === undefined && event.eventResults.findIndex(evt => evt.position === "-") < 0) {

            eventContent += `
                        <div class="event-body-item text-block">
                            <div class="text-block-item">
                                <p>Ведущий:</p>
                                <p><a href="/profile?name=${event.eventHost}">${event.eventHost}</a></p>
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

                        eventContent += `<div class="event-replays">
                                        <h4>ЗАПИСИ</h4>
                                        <div class="event-replays-body">`

                        event.eventRecords.forEach(el => {
                            eventContent += `<div class="event-replays-body__item">
                                            <a class="event-replays-body__item-link" href="${el.videoLink}">${el.videoAuthor}</a>
                                        </div>`
                        })
                                        
                        eventContent += `</div>
                                </div>`

        }

        res.send(header.header + nav.nav + seasons.seasons(seasonNav, content) + events.eventBlock(eventContent, 'style="background: #f7e9ff; height: 100%; padding: 20px"') + footer.footer)

    }

})

app.get('/iZ8saRlTNldVuCJpxH2i/edit', async function(req, res) {

    res.send(header.header)

})

app.post('/iZ8saRlTNldVuCJpxH2i/login', urlencodedParser, async function(req, res){
    if(!req.body && !req.query.userType === undefined) res.sendStatus(400)
    if(req.body.adminName === 'vikakarter' && req.body.adminPass === adminPass) {
        res.redirect('edit')
    }
})

app.listen(3000)