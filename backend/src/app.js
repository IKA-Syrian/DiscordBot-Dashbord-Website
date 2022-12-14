require('dotenv').config()
require('./strategies/discord')
const express = require('express')
const { initialize } = require('passport')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const Store = require('connect-mongo')(session);
const app = express()
const PORT = process.env.PORT || 3002;
const routes = require('./routes')
// const discord = require('discord.js')
// const token = process.env.DASHBOARD_BOT_TOKEN
// const client = new discord.Client({fetchAllMembers:true})

mongoose.connect('mongodb+srv://golden:Ibrahim2002tk@cluster0.u86g6.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(express.json())
app.use(express.urlencoded({
    extended: false,
}))
app.use(cors({
    origin: ["https://bot.golden-manga.com", "https://site.golden-manga.com", "http://localhost:3000", "https://stgbot.golden-manga.com"],
    credentials: true,
}))

app.use(session({
    secret: "secret",
    cookie: {
        maxAge: (60000 * 60 * 24) * 30,
    },
    resave: false,
    saveUninitialized: false,
    store: new Store({ mongooseConnection: mongoose.connection })
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', routes)



app.listen(PORT, async () => {
    console.log(`Runing on ${PORT}`)
})