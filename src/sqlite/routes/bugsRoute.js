const { application } = require('express');
const Bug = require('../models/bugs');

const router = require('express').Router();

router
    .route("/bugs")

    .get(async (req, res) => {
        try {
            const bugs = await Bug.findAll();
            return res.status(200).json(bugs);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    .post(async (req, res) => {
        try {
            const newBug = await Bug.create(req.body);
            return res.status(200).json(newBug);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    .delete(async (req, res) => {
        try {
            const bug = await Bug.destroy({ where: { id: [1,2,3,4] } })
            res.status(200).send({
                message: "Delete successful!" 
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "Error deleting!"
            })
        }
    })

module.exports = router;