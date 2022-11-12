const apiCredencial = 'teste'

function verifyCredencial(credencial) {
    if(credencial != apiCredencial){
        return false
    } 
    return true
}

module.exports = verifyCredencial;