const express = require('express')
var jsforce = require('jsforce');
const app = express()
const port = 3000
var oauth2 = new jsforce.OAuth2({
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : 'https://test.salesforce.com',
    clientId : '3MVG9ux34Ig8G5eoKHMdUtmhw6L948uDpNZEX.tnOTl3jrO3L2vUMPuLFXu9.G.t9rRSIYDjVnr8Pj_RzmniX',
    clientSecret : '485FD9A8F14DC6AC21BF514E6469FD7050D5F83655ABDD170BADF534D7C1F619',
    redirectUri : 'https://rtmsdevorg-dev-ed.my.salesforce-sites.com/'
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/oauth2/auth', function(req, res) {
    console.log('url: ' + req.query.domain);
    let urlStr =oauth2.getAuthorizationUrl({ scope : 'full', prompt :'login' });
    console.log('urlStr:::',urlStr)
    let finalUrlStr = req.query.domain+'/services'+urlStr.split('/services')[1];
    console.log('uuu:::',finalUrlStr)
    res.redirect(finalUrlStr);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})