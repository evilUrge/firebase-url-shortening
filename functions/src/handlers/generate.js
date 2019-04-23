const utils = require('../utils');

const generate = async (url) => {
    const isExists = await (async () => {
        const allRecords = await utils.db('all');
        for (let key of Object.keys(allRecords)) {
            if (allRecords[key] === url) {
                return key
            }
        }
        return false
    })();

    if (isExists) {
        return isExists
    }

    const randomHex = require('crypto').randomBytes(5).toString('hex');
    try {
        await utils.db(randomHex, url);
    } catch (error) {
        console.error(error);
        return false
    }
    return randomHex;
};

exports.generate = {
    type: ['post', 'get'], exec: (async (req, res) =>
            req.body || req.query.url ?
                generate(req.query.url ? req.query.url : (req.body.url ? req.body.url : req.body))

                    .then((hash) => res.status(200)
                        .send(`${utils.isDev ? req.headers.host : utils.constat.host}/${hash}`))

                    .catch(error => res.status(500)
                        .send(`Error occurred: ${error}`))
                : res.status(400).send('Missing URL param').end()
    )
};
