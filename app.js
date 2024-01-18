const express = require("express")
const auth = require('./public/components/auth/auth')
const participants = require('./data/participant.json')
const newsList = require('./data/news.json')
const seasonsList = require('./public/seasons.json')
const event = require('./public/components/eventBlock/event')
const [header, news, nav, about, participant, seasons, footer] = 
        [
            require('./public/components/header/header'), require('./public/components/news/news'), require('./public/components/nav/nav'),
            require('./public/components/about/about'), require('./public/components/participant/participant'), require('./public/components/seasons/seasons'), 
            require('./public/components/footer/footer')
            
        ]

const adminPass = '1emumuvumuzeh'

const app = express()

const urlencodedParser = express.urlencoded({extended: false})

app.use(express.static(__dirname + '/public'))

app.get('/', async function(req, res){

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

app.get('/home', async function(req, res){

    let seasonNav = ``

    seasonsList.seasons.forEach(el => {

        seasonNav += `<li><a class="dropdown-item season-number" id="${el.seasonNumber}" href="#seasons">${el.seasonNumber}</a></li>`
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

    newsList.news.forEach(el => {

        newses += `<div class="news-card">
                    <div class="news-card-header">
                        ${el.newsHeader}
                    </div>
                    <div class="news-card-body">
                        <p>
                            ${el.newsText}
                        </p>
                        <div class="news-card-body__date">${el.newsDate}</div>
                    </div>
                </div>`

    })

    let parts = ``

    participants.participants.forEach(el => {
            parts += `<div class="part-card">
                            <div class="part-card-photo">
                                <img class="part-card-photo__image" src="${el.photo}" alt="placeholder">
                            </div>
                            <div class="part-card-content">
                                <div class="card-content__name">
                                    <h3>${el.name}</h3>
                                </div>
                                <div class="card-content__social">`                            
            el.links.forEach(elem => {
                if(elem.linkName.indexOf('twitch.tv') >= 0) {
                    parts += `<div class="card-content__social-item">
                                    <div class="card-content__social-item-icon">
                                        <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                        <svg width="32px" height="32px" viewBox="0 0 48 48" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <style>.cls-1{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}
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
                if(elem.linkName.indexOf('boosty.to') >= 0) {
                    parts += `<div class="card-content__social-item">
                                    <div class="card-content__social-item-icon">
                                    <?xml version="1.0" encoding="utf-8"?>
                                    <!-- Generator: Adobe Illustrator 24.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                        <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" x="0px" y="0px"
                                            viewBox="0 0 235.6 292.2" style="enable-background:new 0 0 235.6 292.2;" xml:space="preserve"> 
                                        <style type="text/css">
                                            .st0{fill:#242B2C;}
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
                if(elem.linkName.indexOf('t.me') >= 0) {
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
                                                9.38244Z" stroke="#000000" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                    <div class="card-content__social-item-ref">
                                        <a href="${elem.linkAddress}" target="_blank">${elem.linkName}</a>
                                    </div>
                                </div>`
                }
                if(elem.linkName.indexOf('vk.com') >= 0) {
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
                                                11.3733V8.08667H10.7533V13.8467C9.42 13.5133 7.74 11.9 7.66666 8.08667H5.37333Z" fill="#000000"/>
                                        </svg>
                                    </div>
                                    <div class="card-content__social-item-ref">
                                        <a href="${elem.linkAddress}" target="_blank">${elem.linkName}</a>
                                    </div>
                                </div>`
                }
                if(elem.linkName.indexOf('youtube.com') >= 0) {
                    parts += `<div class="card-content__social-item">
                                    <div class="card-content__social-item-icon">
                                    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                    <svg width="28px" height="28px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.168 19.0028C20.4724 19.0867 22.41 17.29 22.5 14.9858V9.01982C22.41 6.71569 20.4724 4.91893 18.168 5.00282H6.832C4.52763 4.91893 2.58998 6.71569 2.5 9.01982V14.9858C2.58998 17.29 4.52763 19.0867 6.832 19.0028H18.168Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.008 9.17784L15.169 11.3258C15.3738 11.4454 15.4997 11.6647 15.4997 11.9018C15.4997 12.139 15.3738 12.3583 15.169 12.4778L12.008 14.8278C11.408 15.2348 10.5 14.8878 10.5 14.2518V9.75184C10.5 9.11884 11.409 8.77084 12.008 9.17784Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    </div>
                                    <div class="card-content__social-item-ref">
                                        <a href="${elem.linkAddress}" target="_blank">${elem.linkName}</a>
                                    </div>
                                </div>`
                }
            })
            parts += `</div>
                    </div>
                </div>`        
    })
    res.send(header.header + nav.nav(seasonNav) + about.about + news.news(newses) + participant.participant(parts) + seasons.seasons + event.eventBlock + footer.footer)
})

app.post('/login', urlencodedParser, async function(req, res){
    if(!req.body && !req.query.userType === undefined) res.sendStatus(400)
    if(req.query.userType === 'viewer' && req.body.userType !== 'admin') {
        console.log('viewer')
        res.redirect('home')
    }
    if(req.query.userType === 'admin' && req.body.adminName === 'vikakarter' && req.body.adminPass === adminPass) {
        console.log('admin')
        res.redirect('home')
    }
})

app.get('/change', async function(req, res){

})

app.listen(3000)