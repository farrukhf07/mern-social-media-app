const { validationResult } = require('express-validator');
const Note = require('../models/Note')


// Route1: GET NOTE
exports.getnote = async (req, res)=>{
    try{
        const notes = await Note.find({user:req.user.id});
        res.json(notes);
    } catch (error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

// Route2: ADD NOTE
exports.addnote = async (req, res)=>{
    const {title, description, tag} = req.body;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    try {
        const note = new Note({
            title, description, tag, user : req.user.id
        });
        const saveNote = await note.save();
        res.json(saveNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

// Route3: UPDATE NOTE
exports.updatenote = async (req, res) =>{
    const {title, description, tag} = req.body;
    const reqId = req.query.id;
    try {
        // Update a note
        var newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        // Find the note to be updated and update it
        let note = await Note.findById(reqId);

        if(!note){
            return res.status(404).send("Not Found!");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!")
        }
        note = await Note.findByIdAndUpdate({_id: reqId}, {$set: newNote}, {new:true})
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

// Route4: DELETE NOTE
exports.deletenote = async (req, res)=>{
    try {
        // Find a note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found!");
        }

        // Allow deleting only if user owns the note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note is deleted!", note:note})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}