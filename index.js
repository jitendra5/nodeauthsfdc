const express = require('express')
var jsforce = require('jsforce');
const app = express()
const port = 3000
var oauth2 = new jsforce.OAuth2({
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : 'https://test.salesforce.com',
    // clientId : '3MVG9ux34Ig8G5eoKHMdUtmhw6L948uDpNZEX.tnOTl3jrO3L2vUMPuLFXu9.G.t9rRSIYDjVnr8Pj_RzmniX',
    // clientSecret : '485FD9A8F14DC6AC21BF514E6469FD7050D5F83655ABDD170BADF534D7C1F619',
    // redirectUri : 'https://rtmsdevorg-dev-ed.my.salesforce-sites.com/'
    clientId : 'clientId',
    clientSecret : 'clientSecret',
    redirectUri : 'redirectUri'
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/oauth2/auth', function(req, res) {
    console.log('domain: ' + req.query.domain);
    console.log('clientId: ' + req.query.clientId);
    console.log('redirecturl: ' + req.query.redirecturl);
    console.log('state: ' + req.query.state);
    //let urlStr =oauth2.getAuthorizationUrl({ scope : 'full', prompt :'login'});
     let urlStr =oauth2.getAuthorizationUrl({ scope : 'full', prompt :'login','client_id' : req.query.clientId,'redirect_uri': req.query.redirecturl, 'state': req.query.state});
     console.log('urlStr:::',urlStr)
    let finalUrlStr = req.query.domain+'/services'+urlStr.split('/services')[1];
    console.log('uuu:::',finalUrlStr)
    res.redirect(finalUrlStr);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})