const express = require(`express`)
const app = express()
const port = 3000

// Import middleware
const checkTime = require(`./middlewares/checkTime`);
const errorsHandler = require(`./middlewares/handleError`);
const notFound = require(`./middlewares/notFoundStatus`)
// Collegamento file responsabile delle rotte
const postsRouter = require("./routers/posts");

// attivazione cartella public
app.use(express.static("public"));
// attivazione registro body parser
app.use(express.json());

//!!---------------MIDDLEWARES---------------!!

// UTILIZZO GENERICO MIDDLEWARES (verrà eseguito per tutte le rotte)
// app.use(checkTime);
// UTILIZZO SPECIFICO PER ROTTA (verrà eseguito solo per quella rotta e tutte le rotte figlie)
app.use("/posts", checkTime);

// devio gestione richieste su file routers/posts.js
app.use("/posts", postsRouter);

// Routing tramite express - vedi file posts.js
// HOME PAGE
app.get("/", (req, res) => {
    res.send("<h1>Home Route app Blog</h1>")
})


// registrazione middlewares
app.use(errorsHandler);
app.use(notFound);





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);

})