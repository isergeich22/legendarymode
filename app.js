const express = require("express")
const auth = require('./public/components/auth/auth')
const [header, news, nav, about, participant, footer] = 
        [
            require('./public/components/header/header'), require('./public/components/news/news'), require('./public/components/nav/nav'),
            require('./public/components/about/about'), require('./public/components/participant/participant'), require('./public/components/footer/footer')
        ]

const adminPass = '1emumuvumuzeh'

const app = express()

const urlencodedParser = express.urlencoded({extended: false})

app.use(express.static(__dirname + '/public'))

app.get('/', async function(req, res){

    res.send(auth.auth)

})

app.get('/home', async function(req, res){
    res.send(header.header + news.news + nav.nav + about.about + participant.participant + footer.footer)
})

// app.post('/home', urlencodedParser, async function(req, res){
//     if(!req.body) res.sendStatus(400)
//     if((req.body.userType === 'viewer' || req.body.userType === 'participant') && req.body.userType !== 'admin') {
//         res.send(header.header + news.news + nav.nav + footer.footer)
//     }
//     if(req.body.userType === 'admin' && req.body.adminName === 'vikarter' && req.body.adminPass === adminPass) {
//         res.send(header.header + news.news + nav.nav + footer.footer)
//     }
// })

app.get('/change', async function(req, res){

})

app.listen(3300)