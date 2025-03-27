const bcrypt = require("bcrypt")

const encrypt = async(password) => {
    const hash = await bcrypt.hash(password, 10)
    return hash
}

const compare = async(password, encryptedPassword) => {
    return await bcrypt.compare(password, encryptedPassword)
}

module.exports = {encrypt, compare}