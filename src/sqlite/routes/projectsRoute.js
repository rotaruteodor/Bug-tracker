const { application } = require('express');
const Project = require('../models/projects');

const router = require('express').Router();

router
    .route("/projects")

    .get(async (req, res) => {
        try {
            const projects = await Project.findAll();
            return res.status(200).json(projects);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    .post(async (req, res) => {
        try {
            const newProject = await Project.create(req.body);
            return res.status(200).json(newProject);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    .delete(async (req, res) => {
        try {
            const proj = await Project.destroy({ where: { id: [1,2,3,4]} })
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
