const postsList = require(`./../data/posts`)

// INDEX
function index(req, res) {
    // copiamo la logica dell'index

    // devo creare una variabile che parte dallo stesso array e riceve quello modificato da .filter
    let filteredList = postsList;
    // logica del filtro
    if (req.query.title) {
        filteredList = postsList.filter(
            post => post.title.includes(req.query.title)
        );
    }
    // Qui lo riconfiguro come oggetto di un array
    const oggettoListaPost = {
        numeroPost: postsList.length,
        listaPost: filteredList
    };
    // test funzionamento filtro
    res.json(oggettoListaPost)
    //res.send("Lista dei post");

}

// SHOW
function show(req, res) {
    // copiamo la logica della show
    // !!! RECUPERA E RIPETI parseINT e .find !!!
    /* CON id = parseINT rendo un numero l'ID dell'array di oggetti (postsList) */
    const id = parseInt(req.params.id)
    /* avendo reso id un numero lo posso trovare e confrontare con .find */
    const post = postsList.find(post => post.id === id);
    /* Logica di verifica esistenza post richiesto */
    if (!post) {
        res.status(404)
        return res.json({
            error: "Not Found!",
            message: "Post inesistente"
        })
    }

    res.json(post)
    // TEMPORARY DEBUG
    //res.send(`Dettaglio del post ${req.params.id}`);

}

// STORE
function store(req, res) {
    // copiamo la logica della store
    // creo nuovo oggetto da spingere in array
    const newId = postsList[postsList.length - 1].id + 1;
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: [req.body.tags]

    }
    // AGGIUNGO POST
    postsList.push(newPost);

    // VERIFICA AGGIORNAMENTO ARRAY
    console.log(postsList);

    // RISULTATI
    res.status(201);
    res.json(newPost);


    // TEMPORARY DEBUG
    //res.send("Creazione di un nuovo post");


}

// UPDATE
function update(req, res) {
    // copiamo la logica dell'update
    // !!! RECUPERA E RIPETI parseINT e .find !!!
    /* CON id = parseINT rendo un numero l'ID dell'array di oggetti (postsList) */
    const id = parseInt(req.params.id)
    /* avendo reso id un numero lo posso trovare e confrontare con .find */
    const post = postsList.find(post => post.id === id);
    /* Logica di verifica esistenza post richiesto */
    if (!post) {

        return res.json({
            status: 404,
            error: "Not Found!",
            message: "Post inesistente"
        })
    }
    
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    console.log(postsList);

    res.json(post);


    // TEMPORARY DEBUG
    //res.send(`Modifica del post ${req.params.id}`);

}


// DESTROY
function destroy(req, res) {
    // copiamo la logica della destroy

    // !!! RECUPERA E RIPETI parseINT e .find !!!
    /* CON id = parseINT rendo un numero l'ID dell'array di oggetti (postsList) */
    const id = parseInt(req.params.id)
    /* avendo reso id un numero lo posso trovare e confrontare con .find */
    const post = postsList.find(post => post.id === id);
    /* Logica di verifica esistenza post richiesto */
    if (!post) {

        return res.json({
            status: 404,
            error: "Not Found!",
            message: "Post inesistente"
        })
    }
    // .splice rimuove l'id selezionato dall'array
    postsList.splice(postsList.indexOf(post), 1);

    // la cancellazione di un elemento non ritorna automaticamente l'array modificato, qui definisco che tipo di risposta voglio
    /* .sendStatus(codice) ritorna il messaggio di conferma cancellazione */
    res.sendStatus(204)

    // TEMPORARY DEBUG
    //res.send(`Cancellazione del post ${req.params.id}`);

}
// esportiamo tutto
module.exports = { index, show, store, update, destroy }