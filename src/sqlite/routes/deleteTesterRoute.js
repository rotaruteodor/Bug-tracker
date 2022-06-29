const { application } = require('express');
const Tester = require('../models/testers');

const router = require('express').Router();

router

    .route("/testers/:id")
    .delete(async (req, res) => {
        try {
            const testerDB = await Tester.destroy({
                where: {
                    id: req.params.id,
                },
            });
            if (!testerDB) {
                res
                    .status(500)
                    .json({ message: "No tester to delete with id " + req.params.id });
            } else {
                res.status(200).json({
                    message: "Tester deleted",
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error on deleting tester",
            });
        }
    })


module.exports = router;