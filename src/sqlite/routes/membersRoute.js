const { application } = require('express');
const Member = require('../models/members');

const router = require('express').Router();

router
    .route("/members")


    .get(async (req, res) => {
        try {
            const members = await Member.findAll();
            return res.status(200).json(members);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    .post(async (req, res) => {
        try {
            const newMember = await Member.create(req.body);
            return res.status(200).json(newMember);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    .delete(async (req, res) => {
        try {
            const memb = await Member.destroy({ where: { id: [1,2,3,4] } })
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