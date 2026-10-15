const express = require("express");
const cors = require("cors");
const conexao = require("./db.js");

const app = express();
app.use(cors());
app.use(express.json());

//#region Artistas

app.get("/", (req, res) => {
    res.status(200).json({ msg: "óia, foi" });
})

app.get("/artistas", (req, res) => {
    const sql = "SELECT * FROM artistas;";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
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
            return res.status(500).json({
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
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao cadastrar artista"
            })
        }

        res.status(201).json({
            mensagem: "Artista cadastrado com sucesso",
            id: resultado.insertId
        });
    })
})

app.delete("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = `DELETE FROM artistas WHERE id = ?`

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao excluir artista"
            })
        };

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Artista não encontrado"
            })
        };

        res.status(200).json({ msg: "Artista exluído com sucesso" });
    })
})

app.put("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nome, genero, pais } = req.body;

    if (!nome || !genero || !pais) {
        return res.status(400).json({ msg: "Insira nome, genero e pais com um ID válido" });
    }

    const sql = `UPDATE artistas SET nome = ?, genero = ?, pais = ? WHERE id = ?`;

    conexao.query(sql, [nome, genero, pais, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Não foi possível atualizar artista" });
        };

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Artista não encontrado" });
        };

        res.status(200).json({ msg: "Artista atualizado com sucesso" });
    });
});

// #endregion

//#region Álbuns

app.get("/albuns", (req, res) => {
    const sql = "SELECT * FROM albuns;";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Não foi possível mostrar álbuns" });
        }

        res.status(200).json(resultado)
    })
})

app.get("/albuns/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = "SELECT * FROM albuns WHERE id = ?;";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Não foi possível mostrar álbuns" });
        }

        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Álbum não encontrado" });
        }

        res.status(200).json(resultado);
    })
})

app.post("/albuns", (req, res) => {
    const { titulo, ano_lancamento, artista_id } = req.body;

    if (!titulo || !ano_lancamento || !artista_id) {
        return res.status(400).json({ erro: "Insira título, ano de lançamento e o id do artista" })
    }

    const sql = "INSERT INTO albuns (titulo, ano_lancamento, artista_id) VALUES (?, ?, ?)";

    conexao.query(sql, [titulo, ano_lancamento, artista_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Não foi possível adicionar álbum" });
        }

        res.status(200).json({
            msg: "Álbum adicionado com sucesso!",
            id: resultado.insertId
        });
    })
})

app.delete("/albuns/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = "DELETE FROM albuns WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Não foi possível deletar álbum" });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Álbum não encontrado" });
        }

        res.status(200).json({ msg: "Álbum deletado com sucesso" });
    })
})

app.put("/albuns/:id", (req, res) => {
    const id = Number(req.params.id);
    const { titulo, ano_lancamento, artista_id } = req.body;

    if (!titulo || !ano_lancamento || !artista_id) {
        return res.status(400).json({erro: "Insira título, ano de lançamento e ano de lançamento"})
    }

    const sql = "UPDATE albuns SET titulo = ?, ano_lancamento = ?, artista_id = ? WHERE id = ?";

    conexao.query(sql, [titulo, ano_lancamento, artista_id, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({erro: "Não foi possível atualizar álbum"});
        }

        if (resultado.affectedRows === 0) {
            return res.status(400).json({erro: "Álbum não encontrado"});
        }

        res.status(200).json({msg: "Informações atualizadas"});
    })
})

//#endregion

//#region Músicas

app.get("/musicas", (req, res) => {
    const sql = "SELECT * FROM musicas;";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar músicas"
            })
        }

        res.status(200).json(resultado);
    })
});

app.get("/musicas/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = `SELECT * FROM musicas WHERE id = ?`;

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Não foi possível listar músicas"
            })
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Música não encontrado"
            })
        }

        res.status(200).json(resultado[0]);
    })
})

app.post("/musicas", (req, res) => {
    const { titulo, duracao, album_id } = req.body;
    const sql = `INSERT INTO musicas (titulo, duracao, album_id) VALUES(?, ?, ?)`;


    if (!titulo || !duracao || !album_id) {
        return res.status(400).json({ msg: "título, duração e id de álbum obrigatórios" });
    }

    conexao.query(sql, [titulo, duracao, album_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao cadastrar música"
            })
        }

        res.status(201).json({
            mensagem: "Música cadastrada com sucesso",
            id: resultado.insertId
        });
    })
})

app.delete("/musicas/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = `DELETE FROM musicas WHERE id = ?`

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao excluir música"
            })
        };

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Música não encontrado"
            })
        };

        res.status(200).json({ msg: "Música exluída com sucesso" });
    })
})

app.put("/musicas/:id", (req, res) => {
    const id = Number(req.params.id);
    const { titulo, duracao, album_id } = req.body;

    if (!titulo || !duracao || !album_id) {
        return res.status(400).json({ msg: "Insira título, duração e ID do álbum com um ID válido" });
    }

    const sql = `UPDATE musicas SET titulo = ?, duracao = ?, album_id = ? WHERE id = ?`;

    conexao.query(sql, [titulo, duracao, album_id, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Não foi possível atualizar música" });
        };

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Música não encontrada" });
        };

        res.status(200).json({ msg: "Música atualizada com sucesso" });
    });
});

// #endregion

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor iniciado em ${PORTA}`)
});