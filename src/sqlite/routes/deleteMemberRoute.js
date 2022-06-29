const { application } = require('express');
const Member = require('../models/members');

const router = require('express').Router();

router

    .route("/members/:id")
    .delete(async (req, res) => {
        try {
            const memberDB = await Member.destroy({
                where: {
                    id: req.params.id,
                },
            });
            if (!memberDB) {
                res
                    .status(500)
                    .json({ message: "No member to delete with id " + req.params.id });
            } else {
                res.status(200).json({
                    message: "Member deleted",
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error on deleting member",
            });
        }
    })


module.exports = router;