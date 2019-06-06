Firebase URL Shortening
---
Create a tiny version of any url

## How to use
* As we have 2 separate environments in this setup, edit `/function/config/production.json` and `development.json` based on your project configurations:
    * Go to the main project overview tab `https://console.firebase.google.com/u/0/project/<your-firebase-project-id>/overview`, click on *"Add app"* and then chose *"Web"* (`html-head` icon), copy the content of the var `config` after the key `FirebaseConf` in the selected configuration file.
    * Generate a private key from: `https://console.firebase.google.com/u/0/project/<your-firebase-project-id>/settings/serviceaccounts/adminsdk` and paste it under the key "FirebaseAdminSDK".
* Modify `.firebaserc` in the root of the project, and replace 'qa' and 'production' values to your firebase existing project id's.     

Once that's done, just define what environment to use with `firebase use <qa or production>` cmd, and finally deploy `firebase deploy`
Currently runs from GCP as a function from the following URL:
https://s.evilurge.com/

##### To generate a new tiny url use one of the two methods:
- **GET:** `https://s.evilurge.com/generate?url=http://www.epiphone.com/Products/Electrics/Archtop/Sheraton-II-PRO.aspx`
- **POST:** `https://s.evilurge.com/generate` req body: 
```json
{"url": "http://www.epiphone.com/Products/Electrics/Archtop/Sheraton-II-PRO.aspx"}
```

## How to deploy
- First install all node dependencies: `npm i`
- Make sure you have firebase tools installed in your global: `npm i -g firebase-tools`
- And deploy via: `firebase deploy --only functions`


## How to extend
As in any other microservice, this one is using express with a nice wrapper around it. Just add another .js in `/function/src/handlers` with the following format:
```javascript
exports.theNameOfYourHandler = {
    type: ['post', 'get'], exec: (async (req, res) => // Can also have only one request type by just passing _ex_:type:'get'
            res.status(200).send('Cool beans!')
    )};
```

