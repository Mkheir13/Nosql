const express = require('express');
const app = express();
const port = process.env.PORT || 8989;
const www = process.env.WWW || './';
app.use(express.static(www));
console.log(`serving ${www}`);
app.get('*', (req, res) => {
    res.send("Communication avec le conteneur \"nodeJS\" : OK");
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
