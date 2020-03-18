const express = require('express')
const port = process.env.PORT || 3000
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')
const app = express()

// proxy middleware options
const options = {
    target: 'https://www.mtsbank.ru', // target host
    changeOrigin: true, // needed for virtual hosted sites
    headers: {
        Connection: 'keep-alive',
        "Access-Control-Allow-Origin": "*",
        https: true
    },
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);

app.use(cors())
app.use('/upload', exampleProxy)
app.get('/hello', function (req, res) {
    res.send(JSON.stringify({ Hello: 'World'}));
});

app.listen(port, function () {
    console.log(`Example app listening on port !`);
})