const router = require('express').Router();
const auth = require('./auth')
const discord = require('./discord')
const track = require('./track')
const series = require('./series')
const certificate = require('./certificate')
const flame = require('./flame')
const golden = require('./golden')
const CollabGolden = require('./collab-golden')

router.use('/auth', auth)
router.use('/discord', discord)
router.use('/track', track)
router.use('/series', series)
router.use('/certificate', certificate)
router.use('/flame', flame)
router.use('/golden', golden)
router.use('/collab', CollabGolden)
module.exports = router;