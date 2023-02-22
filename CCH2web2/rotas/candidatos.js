const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//exibe todos os candidatos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM candidato;',
            (error, resultado, fields) => {
                if(error) {return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        ) 
    });
});

// registra um cadidato
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO candidato (nome, partido, cargo) VALUES(?,?,?)',
            [req.body.nome, req.body.partido, req.body.cargo],
            (error, resultado, field) =>{
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                res.status(201).send({
                    mensagem: 'Candidato Cadastrado',
                    idcandidato: resultado.insertId
                })
            }
        )
    });

});

// Alterar um candidato
router.put('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `UPDATE candidato 
                SET nome = ?, 
                partido  = ?,
                cargo    = ?
                WHERE idcandidato =?`,
            [   
                req.body.nome,
                req.body.partido, 
                req.body.cargo, 
                req.body.idcandidato
            ],
            (error, resultado, field) =>{
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                res.status(202).send({
                    mensagem: 'Candidato Alterado'
                })
            }
        )
    });
});

// deleta um cadidato
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'DELETE FROM candidato WHERE idcandidato = ?', [req.body.idcandidato],
            (error, resultado, field) =>{
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                res.status(202).send({
                    mensagem: 'Candidato Excluido'
                })
            }
        )
    });
});

module.exports = router;