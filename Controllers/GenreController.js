const Genre = require('../models/genre');
const verifyCredencial = require('../src/credencials')

module.exports = {
    // INSERT - POST
    async post(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }

        const { genre } = req.body;
        const insertGenre = await Genre.create({genre})
        return res.status(200).json({"Enviado":insertGenre})
    },
    // SELECT - GET
    async getAll(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }

        const allGenres = await Genre.findAll()

        return res.status(200).json(allGenres)
    },
    // SELECT BY ID
    async getById(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }

        const idGenre = req.params.id

        const selectGenre = await Genre.findByPk(idGenre);

        if (!selectGenre){
            return res.status(401).send(`Não existe Genre com este o id ${idGenre}`)
        }
        return res.status(200).json(selectGenre)
    },
    
    // UPDATE BY ID
    async update(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }

        const { genre } = req.body
        const idGenre = req.params.id

        const selectGenre = await Genre.findByPk(idGenre);

        if (!selectGenre){
            return res.status(401).send(`Don't exist genre with id ${idGenre}`)
        }

        await Genre.update(
            { genre },
            {
                where: {
                    id: req.params.id
                },
            },
        )
        return res.status(200).send('Genre updated with sucess!')
    },

    // DELETE BY ID
    async delete(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }

        await Genre.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).send('Genre Removida com sucesso.')
    }

};