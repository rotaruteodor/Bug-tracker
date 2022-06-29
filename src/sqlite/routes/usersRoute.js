const { application } = require('express');
const User = require('../models/users');

const router = require('express').Router();

router
    .route("/users")

    .get(async (req, res) => {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    .post(async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            return res.status(200).json(newUser);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    .delete(async (req, res) => {
        try {
            const userrr = await User.destroy( {where: {id:[1,2,3,4]}  } )
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
