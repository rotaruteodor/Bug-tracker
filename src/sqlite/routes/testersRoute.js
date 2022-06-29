const { application } = require('express');
const Tester = require('../models/testers');

const router = require('express').Router();

router
    .route("/testers")

    .get(async (req, res) => {
        try {
            const testers = await Tester.findAll();
            return res.status(200).json(testers);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    .post(async (req, res) => {
        try {
            const newTester = await Tester.create(req.body);
            return res.status(200).json(newTester);
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try {
            const tester = await Tester.destroy({ where: { id: [1,2,3,4]} })
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