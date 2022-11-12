const Book = require('../models/book');
const Situation = require('../models/situation')
const verifyCredencial = require('../src/credencials')


module.exports = {
    // INSERT - POST
    async post(req, res) {
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }


        const { situationId, book, author, dateInit, dateFinish, rating, pages, comments } = req.body;
        //Verificar se já existe este situationId
        const selectSituation = await Situation.findByPk(situationId);
        if (!selectSituation){
            return res.status(401).send("Situation don't exists")
        }
        const insertBook = await Book.create({ situationId, book, author, dateInit, dateFinish, rating, pages, comments })
        return res.status(200).json({"Enviado":insertBook})
    },

    // SELECT ALL - GET
    async getAll(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }

        const allBooks = await Book.findAll({
            include: [{association:'situation'},{association: 'genres'}]
          });

        return res.status(200).json(allBooks)
    },  

    // SELECT BY ID
    async getById(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }

        const bookId = req.params.id

        const book = await Book.findByPk(bookId,{
            include: [{association:'situation'},{association: 'genres'}]
        });

        if (!book){
            return res.status(404).send(`Book with id ${bookId} don't exists`)
        }
        return res.status(200).json(book)
    },

    // UPDATE BY ID
    async update(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }
        
        const bookId = req.params.id
        const { situationId, book, author, dateInit, dateFinish, rating, pages, comments } = req.body;

        const selectBook = await Book.findByPk(bookId);

        if (!selectBook){
            return res.status(404).send(`Book with id ${bookId} don't exists`)
        }
    
        await Book.update(
            { situationId, book, author, dateInit, dateFinish, rating, pages, comments },
            {
                where: {
                    id: req.params.id
                },
            },
        )
        return res.status(200).send('Book updated with sucess!')
    },
    // DELETE BY ID
    async delete(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }
        
        const bookId = req.params.id
        const book = await Book.findByPk(bookId);

        if (!book){
            return res.status(404).send(`Book with id ${bookId} don't exists`)
        }

        await Book.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).send('Book removed with Sucess!')
    }
}