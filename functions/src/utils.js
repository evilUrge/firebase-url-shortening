const fs = require('fs');

const baseDir = require('path').join(__dirname, '..');
exports.baseDir = baseDir;

const isDev = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development';
exports.isDev = isDev;

exports.config = (() =>
    /**
     * Get GCP\FB config base on NODE_ENV
     * @type {string} path to the service account.
     * @return {JSON} service account json.
     */
    require(`${baseDir}/config/${
        (fs.readdirSync(`${baseDir}/config`)
            .find((currentFile) => process.env.NODE_ENV ? currentFile === `${process.env.NODE_ENV.toLowerCase()}.json` : false))
            ? process.env.NODE_ENV : 'production'}.json`))();

/**
 * Exposing Firebase realtime database for internal usage(mainly catching responses)
 * @param path
 * @param write
 * @returns {Promise<*>}
 */
exports.db = async (path, write = false) => {
    const fb = require('./firebase');
    const db = await fb.admin.database();
    if (write) {
        return await db.ref(`/reroute/${path}`)
            .set(write)
            .then((snapshot) => snapshot)
            .catch(error => console.error(error))
    }
    return await db.ref(`/reroute${path === 'all' ? '' : '/' + path}`)
        .once('value')
        .then((snapshot) => snapshot.exists() ? snapshot.val() : false)
        .catch(error => console.error(error))
};

exports.constat = {
    host: 'https://s.evilurge.com'
};
