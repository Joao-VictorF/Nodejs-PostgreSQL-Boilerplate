const general = require('./general')
const auth = require('./auth')

const controller = { ...general, ...auth }

module.exports = controller