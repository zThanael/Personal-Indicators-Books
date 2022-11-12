const Situation = require('../models/situation');
const verifyCredencial = require('../src/credencials')

module.exports = {
    // INSERT - POST
    async post(req, res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }

        const { situation } = req.body;
        const insetSituation = await Situation.create({situation})
        return res.status(200).json({"Enviado":insetSituation})
    },
    // SELECT - GET
    async getAll(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }

        const allSituations = await Situation.findAll()

        return res.status(200).json(allSituations)
    },
    // SELECT BY ID
    async getById(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }
        
        const idSituation = req.params.id

        const getSituation = await Situation.findByPk(idSituation);

        if (!getSituation){
            return res.status(401).send(`Does not exist situation with id ${idSituation}`)
        }
        return res.status(200).json(getSituation)
    },
    
    // UPDATE BY ID
    async update(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }

        const idSituation = req.params.id
        const { situation } = req.body

        const getSituation = await Situation.findByPk(idSituation);

        if (!getSituation){
            return res.status(401).send(`Does not exist situation with id ${idSituation}`)
        }

        await Situation.update(
            { situation },
            {
                where: {
                    id: idSituation
                },
            },
        )
        return res.status(200).send('Situação alterada com sucesso.')
    },

    // DELETE BY ID
    async delete(req,res){
        const authorization = req.headers.authorization
        const verify = verifyCredencial(authorization)
        if (!verify){
            return res.status(403).send(`Authorization is wrong or missing!`)
        }

        const idSituation = req.params.id

        const getSituation = await Situation.findByPk(idSituation);

        if (!getSituation){
            return res.status(401).send(`Does not exist situation with id ${idSituation}`)
        }

        await Situation.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).send('Situação Removida com sucesso.')
    }

};