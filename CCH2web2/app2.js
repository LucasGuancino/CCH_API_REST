const express = require("express");
const unirest = require("unirest");
const app = express();

app.get('/ConsumoGetCandidatos', async function(req, res){
    var resposta = await unirest.get('http://localhost:3000/candidatos')
    console.log(resposta.body.data.candidatos[0].nome)
    res.send(resposta)
});

app.get('/ConsumoPostCandidatos', async function(req, res){
    var resposta = await unirest.post('http://localhost:3000/candidatos').send({"nome":"Joao da Silva","partido":"PSOFTWARE","cargo":"P"})
    res.send(resposta)
});

app.get('/ConsumoPutCandidatos', async function(req, res){
    var resposta = await unirest.put('http://localhost:3000/candidatos').send({"nome":"Joao da Silva","partido":"PSOFTWARE","cargo":"P","idcandidato":6})
    res.send(resposta)
});

app.get('/ConsumoDeleteCandidatos', async function(req, res){
    var resposta = await unirest.delete('http://localhost:3000/candidatos').send({"idcandidato":6})
    res.send(resposta)
})

app.get('/ConsumoGetVotos/:id', async function(req, res){
    const {id} = req.params;
    var resposta = await unirest.get('http://localhost:3000/votos'+id)
    console.log(resposta.body.data.candidatos[0].nome)
    res.send(resposta)
});

app.get('/ConsumoPostVotos', async function(req, res){
    var resposta = await unirest.post('http://localhost:3000/votos').send({"idcandidato": 5,"cpf":"99999999911", "sexo":"masculino"})
    res.send(resposta)
});

app.get('/ConsumoDeleteVotos', async function(req, res){
    var resposta = await unirest.delete('http://localhost:3000/votos').send({"idvoto":5})
});

app.listen(3080, function(){console.log("Servidor no http://localhost:3080")});