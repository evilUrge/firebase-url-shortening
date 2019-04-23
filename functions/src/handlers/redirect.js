const utils = require('../utils');

exports.all = {
    type: 'get', exec: (async (req, res) =>
        utils.db(req.url.substring(1))
            .then((url) => res.redirect(url))
            .catch(error => res.status(500).send(`Error occurred: ${error}`)))
};
