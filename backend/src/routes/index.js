const router = require('express').Router();
const auth = require('./auth')
const discord = require('./discord')
const track = require('./track')
const series = require('./series')
router.use('/auth', auth)
router.use('/discord', discord)
router.use('/track', track)
router.use('/series', series)
module.exports = router;