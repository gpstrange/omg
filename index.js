const express = require('express')
const app = express()
const port = process.env.PORT || 8000;
app.use(express.static('dist'));

app.get('/',  (req, res) => {
  res.sendfile(__dirname+'/dist/index.html');
})

app.listen(port, () => {
	console.log("server started and running on port number "+ port);
});
