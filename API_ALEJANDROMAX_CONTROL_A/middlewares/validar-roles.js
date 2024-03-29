const { request, response, json } = require("express")

const tieneRole = (...roles) => {
    return (req= request, res = response, next ) => {
        if(!req.user){
            return res.status(500).json({
                msg: 'Se quiere certificar un role si validar token'
            })
        }

        if(!roles.includes(req.user)){
            return res.status(400).json({
                msg: `Este endpoint necesita algun rol ${roles}`
            })
        }
    }
}

module.exports = {
    tieneRole
}