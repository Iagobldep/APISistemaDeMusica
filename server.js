const express = require("express");
const cors = require("cors");
const conexao = require("./db.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ msg: "óia, foi" });
});

app.get("/artistas", (req, res) => {
    const sql = "SELECT * FROM artistas;";

    conexao.query(sql, (erro, resultado) => {
        if (erro){
            return res.status(500).json({
                erro: "Erro ao listar artistas"
            })
        }
        
        res.status(200).json(resultado);
    })
});

app.get("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = `SELECT * FROM artistas WHERE id = ?`;

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(404).json({
                erro: "Não foi possível listar artistas"
            })
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Artista não encontrado"
            })
        }
        
        res.status(200).json(resultado[0]);
    })
})

app.post("/artistas", (req, res) => {
    const { nome, genero, pais } = req.body;
    const sql = `INSERT INTO artistas (nome, genero, pais) VALUES(?, ?, ?)`;


    if (!nome || !genero || !pais) {
        return res.status(400).json({ msg: "nome, gênero e pais são obrigatórios" });
    }

    conexao.query(sql, [nome, genero, pais], (erro, resultado) => {
        if (erro){
            return res.status(500).json({
                erro: "Erro ao listar artistas"
            })
        }
        
        res.status(201).json({
            mensagem: "Artista cadastrado com sucesso",
            id: resultado.insertId
        });
    })
})

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor iniciado em ${PORTA}`)
});