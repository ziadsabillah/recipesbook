const router = require('express').Router();
const Recipe = require('../models/recipe.model');
const verify = require('./verifyToken');

// Get All the recipes
router.get('/', verify, (req, res) => {
    Recipe.find({userId: req.user._id})
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json("Error: " + err));
});

// Get only one recipe
router.get('/:id', verify, (req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => res.send(recipe))
        .catch(err => res.status(400).send('Recipe not found! error: ' + err));
});

router.post('/add', verify, (req, res) => {
    const newRecipe = new Recipe({
        userId: req.user._id,
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        photo_url: req.body.photo_url
    });

    newRecipe.save()
        .then(() => res.send('Recipe Added!'))
        .catch(err => res.status(400)
        .send('Error: '+err));
});

// Update Recipe
router.post('/update/:id', verify, (req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            recipe.title = req.body.title,
            recipe.description = req.body.description,
            recipe.duration = req.body.duration,
            recipe.photo_url = req.body.photo_url

            recipe.save().then(() => res.send('Recipe Updated'))
                .catch(err => res.status(400).send('Error: '+err));
        }).catch(err => res.status(400).send('Error:'+ err));
});

// Deleting a recipe
router.delete('/:id', verify, (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.send('Exercise Deleted'))
        .catch(err => res.status(400).send('error: '+err));
});

module.exports = router;