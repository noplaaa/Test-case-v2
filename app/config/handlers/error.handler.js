// handler for internal server error
module.exports = (err, res) => {
    if (res.headersSent) {
        return
    }

    console.error(`Error! Handler response --> ${err.message}`);
    res.status(500).send(`${err.message}`);
}