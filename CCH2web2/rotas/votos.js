const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//Exibir Votos
router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `SELECT 
                candidato.nome,
                candidato.partido,
                CAST((count(voto.idcandidato) / (SELECT COUNT(*) FROM voto LEFT JOIN candidato ON (voto.idcandidato = candidato.idcandidato) WHERE candidato.cargo = ?)) * 100 AS DECIMAL(18,2)) as porcentagem
            FROM 
                candidato
        
            LEFT JOIN voto ON (voto.idcandidato = candidato.idcandidato)
        
            WHERE
                candidato.cargo = ?
        
            GROUP BY 
                candidato.nome,
                candidato.partido`,
            [req.params.id, req.params.id],
            (error, resultado, fields) => {
                if(error) {return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        ) 
    });
});

//registra um voto
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO voto (idcandidato, cpf, sexo) VALUES(?,?,?)',
            [req.body.idcandidato, req.body.cpf, req.body.sexo],
            (error, resultado, field) =>{
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                res.status(201).send({
                    mensagem: 'Voto Computado',
                    idvoto: resultado.insertId
                })
            }
        )
    });
});


// deletar voto
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'DELETE FROM voto WHERE idvoto = ?', [req.body.idvoto],
            (error, resultado, field) =>{
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                res.status(202).send({
                    mensagem: 'Voto Excluido'
                })
            }
        )
    });
});

module.exports = router;