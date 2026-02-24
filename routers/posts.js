// QUESTO FILE GESTISCE TUTTE LE ROTTE DELLA MIA APP
const express = require("express");
const router = express.Router();

// UTILIZZO IL FILE CHE CONTIENE L'ARRAY DI OGGETTI
//const postsList = require(`./../data/posts`)
// Ora che ho la logica che opera sull'array separata da questo file, non devo più utilizzare l'array qui, ma posso semplicemente importare il controller
const postsListCtrl = require(`../controllers/postsListCtrl`);
const { index, show, store, update, destroy } = postsListCtrl
//  Dove prima sviluppavo la logica delle varie risposte, ora posso invocare le funzioni contenute dal controller

// INDEX → lista di tutti i post
router.get("/", postsListCtrl.index);

// SHOW → dettaglio di un singolo post
router.get("/:id", postsListCtrl.show);

// STORE → creazione di un nuovo post
router.post(`/`, postsListCtrl.store);
// UPDATE → modifica di un post esistente
router.put(`/:id`, postsListCtrl.update);

// DELETE → cancellazione di un post
router.delete(`/:id`, postsListCtrl.destroy);



module.exports = router;