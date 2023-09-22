const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('src/interface'));

app.get('/',(request, response) =>{
    fs.readFile('./src/interface/index.html', 'utf8', (err,html)=>{
        if(err){
            response.status(500).send('Pagina no disponible');
        }
        response.send(html);
    })
});

app.listen(process.env.PORT || 3001  , ()=>console.log('App disponible en http://localhost:3001'));