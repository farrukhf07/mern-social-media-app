const express = require('express');
const router = express.Router();
const { body} = require('express-validator');
var fetchuser = require('../middleware/fetchuser')
var fetchbearuser = require('../middleware/fetchbearuser')
var Controller = require('../controller/notes.controller')

// Route1: Get all notes: GET "/api/notes/fetchallnotes".
router.get(
    '/fetchallnotes', 
    fetchbearuser,
    Controller.getnote
);

// Route2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
    '/addnote',
    fetchuser,
    [
        body('title', 'Enter a valid title').isLength({min:3}),
        body('description', 'Enter valid description').isLength({min:5}),
    ],
    Controller.addnote
);

// Route3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put(
    '/updatenote',
    fetchuser,
    Controller.updatenote
);

// Route4: Delete a Note using: DELETE "/api/notes/deletenote". Login required
router.delete(
    '/deletenote/:id',
    fetchuser,
    Controller.deletenote
);



module.exports = router