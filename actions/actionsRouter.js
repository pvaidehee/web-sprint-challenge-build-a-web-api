const express = require("express"); 
const actions = require("../data/helpers/actionModel"); 
const router = express.Router(); 

router.get("/", (req, res) => {
    actions.get()
        .then(actions => {
            res.status(200).json(actions); 
        })
        .catch(err => {
            res.status(404).json({ message: "Actions not found" }); 
        })
}); 

router.put("/:id", validateAction, (req, res) => {
    const id = req.params.id; 
    const changes = req.body; 
    actions.update(id, changes)
        .then(updated => {
            res.status(201).json({ message: "Action successfully updated!" }); 
        })
        .catch(err => {
            res.status(500).json({ message: "There has been an error updating the action" }); 
        })
}); 

router.post("/", validateAction, (req, res) => {
    const projectId = req.body.project_id; 
    const description = req.body.description; 
    const notes = req.body.notes; 
    
    actions.insert(req.body)
        .then(action => {
            res.status(201).json(action); 
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error adding this action" }); 
        })
}); 

router.delete("/:id", (req, res) => {
    const id = req.params.id; 
    actions.remove(id)
        .then(action => {
            res.status(200).json({ message: "Action successfully removed" }); 
        })
        .catch(err => {
            res.status(500).json({ message: "Problem removing this action" }); 
        })
})

//Middleware

function validateAction(req, res, next){
    const body = req.body; 
    const projectId = req.body.project_id; 
    const description = req.body.description; 
    const notes = req.body.notes;
    if(!body){ 
        res.status(400).json({ message: "Missing action data" }); 
    } else if(!projectId || !notes || !description){
        res.status(400).json({ message: "A required field is missing for this action" }); 
    } else if(description.length >= 160){
        res.status(403).json({ message: "Please keep actions description to 128 characters or more" }); 
    } else {
        next(); 
    }
}; 
 
module.exports = router; 