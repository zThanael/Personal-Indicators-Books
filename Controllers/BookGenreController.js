const Book = require('../models/book')
const Genre = require('../models/genre');
const BookGenre = require('../models/bookgenre')
const verifyCredencial = require('../src/credencials')

module.exports = {
    // INSERT - POST
    async post(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }
        
        const { bookId, genreId } = req.body

        const book = await Book.findByPk(bookId)
        if (!book) {
            return res.send(`Does not exist a book with id ${bookId}`)
        }

        const genre = await Genre.findByPk(genreId)
        if (!genre) {
            return res.send(`Does not exist a book with id ${genreId}`)
        }

        const insertBookGenre = await BookGenre.create( { bookId, genreId } )

        return res.status(200).json({"Enviado":insertBookGenre})
    },
    // SELECT - GET
    async getAll(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }
        
        const allBooks = await BookGenre.findAll();

        return res.status(200).json(allBooks    )
    },
    // SELECT BY ID
    async getById(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }
        
        const idBook = req.params.id

        const selectBookGenre = await Book.findByPk(idBook,
            {
                include: [{association:'situation'},{association: 'genres'}]
            });

        if (!selectBookGenre){
            return res.status(401).send(`Não existe Genre com este o id ${idBook}`)
        }
        return res.status(200).json(selectBookGenre)
    },
    // UPDATE
    async update(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }
        
        const bookGenreId = req.params.id
        const { bookId, genreId } = req.body

        
        const bookGenre = await BookGenre.findByPk(bookGenreId)
        if (!bookGenre){
            return res.status(401).send(`Does not exists bookGenre with id ${bookGenreId}`)
        }

        if (bookId){
            const book = await Book.findByPk(bookId); 
            if (!book){
                return res.status(401).send(`Does not exists book with id ${book}`)
            }
        }

        if (genreId){
            const genre = await Genre.findByPk(genreId)
            if (!genre) {
                return res.send(`Does not exist a genre with id ${genreId}`)
            }
        }

        await BookGenre.update(
            { bookId, genreId },
            {
                where: {
                    id: bookGenreId
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
        
        const bookGenreId = req.params.id
        const bookGenre = await Book.findByPk(bookGenreId);

        if (!bookGenre){
            return res.status(404).send(`bookGenre with id ${bookGenreId} don't exists`)
        }

        await BookGenre.destroy({
            where: {
                id: bookGenreId
            }
        })
        return res.status(200).send('bookGenre removed with Sucess!')
    }
    
};