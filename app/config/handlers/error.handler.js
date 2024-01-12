// handler for internal server error
module.exports = (err, res) => {
    console.error(`Error! Handler response --> ${err.message}`)
    return res.status(500).send(`${err.message}`)
}