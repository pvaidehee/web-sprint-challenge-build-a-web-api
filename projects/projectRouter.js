const express = require("express"); 
const projects = require("../data/helpers/projectModel"); 
const router = express.Router(); 

router.get("/", (req, res) => {
    projects.get()
        .then(projects => {
            console.log("success"); 
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ message: "Error getting resource" }); 
        })
});


router.get("/:id", (req, res) => {
    const id = req.params.id; 
    projects.get(id)
        .then(project => {
            console.log("success"); 
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({ message: "Error getting resource" }); 
        })
});


router.get("/:id", (req, res) => {
    const id = req.params.id; 
    projects.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions); 
        })
        .catch(err => {
            res.status(500).json({ message: "Error returning actions " }); 
        })
}); 

router.put("/:id", validatePost, (req, res) => {
    const changes = req.body; 
    const id = req.params.id; 
    projects.update(id, changes)
        .then(updated => {
            res.status(200).json(updated); 
        })
        .catch(err => {
            res.status(500).json({ message: "Error updating " }); 
        })
}); 

router.post("/", validatePost, (req, res) => { 
   
    projects.insert(req.body)
        .then(project => {
            res.status(201).json(project); 
        })
        .catch(err => {
            res.status(500).json({ message: "Error adding a new project" }); 
        })
}); 

router.delete("/:id", (req, res) => {
    const id = req.params.id; 
    projects.remove(id)
        .then(project => {
            res.status(200).json(project); 
        })
        .catch(err => {
            res.status(500).json({ message: "Error removing" }); 
        })
});

//Middleware

function validatePost(req, res, next){
    const body = req.body; 
    const name = req.body.name; 
    const description = req.body.description; 
    if(!body){
        res.status(400).json({ message: "Missing project data" }); 
    } else if(!name || !description){
        res.status(400).json({ message: "Missing required field" }); 
    } else {
        next(); 
    }
}; 

module.exports = router; 