import React, { useState } from "react";
import axios from 'axios';





function Register({ openPopup }) {

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function isValid() {
        let areAllInputsValid = true;

        console.log('firstname ', document.getElementById('textBoxRegisterFirstName').value.trim().length)
        if (document.getElementById('textBoxRegisterFirstName').value.trim().length < 3) {
            document.getElementById('labelRegisterFirstName').style.display = 'block';
            areAllInputsValid = false;
        }
        else {
            document.getElementById('labelRegisterFirstName').style.display = 'none';
        }

        if (document.getElementById('textBoxRegisterLastName').value.trim().length < 3) {
            document.getElementById('labelRegisterLastName').style.display = 'block';
            areAllInputsValid = false;
        }
        else {
            document.getElementById('labelRegisterLastName').style.display = 'none';
        }

        let emailExists = false;
        await axios.get('http://localhost:3000/api/users').then(resp => {
            for (let user of resp.data) {
                if (user.email === document.getElementById('textBoxRegisterEmail').value.trim()) {
                    emailExists = true;
                    break;
                }
            }
        })


        if (!validateEmail(document.getElementById('textBoxRegisterEmail').value.trim())) {
            document.getElementById('labelRegisterEmail').style.display = 'block';
            areAllInputsValid = false;
        }
        else if (emailExists) {
            document.getElementById('labelRegisterEmail').innerHTML = 'There is already an account for this email';
            document.getElementById('labelRegisterEmail').style.display = 'block';
            areAllInputsValid = false;
        }
        else {
            document.getElementById('labelRegisterEmail').style.display = 'none';
        }

        if (document.getElementById('textBoxRegisterUsername').value.trim().length < 3) {
            document.getElementById('labelRegisterUsername').style.display = 'block';
            areAllInputsValid = false;
        }
        else {
            document.getElementById('labelRegisterUsername').style.display = 'none';
        }

        if (document.getElementById('textBoxRegisterPassword').value.trim().length < 3) {
            document.getElementById('labelRegisterPassword').style.display = 'block';
            areAllInputsValid = false;
        }
        else {
            document.getElementById('labelRegisterPassword').style.display = 'none';
        }

        return areAllInputsValid;

    }

    function addUserToDatabase() {

        console.log('valid????', isValid())
        console.log('email', validateEmail(document.getElementById('textBoxRegisterEmail').value.trim()))

        isValid().then(areInputsValid => {
            if (areInputsValid) {
                axios.post('http://localhost:3000/api/users', {
                    firstName: document.getElementById('textBoxRegisterFirstName').value.trim(),
                    lastName: document.getElementById('textBoxRegisterLastName').value.trim(),
                    email: document.getElementById('textBoxRegisterEmail').value.trim(),
                    username: document.getElementById('textBoxRegisterUsername').value.trim(),
                    password: document.getElementById('textBoxRegisterPassword').value.trim()
                })
                document.getElementById("textBoxRegisterFirstName").style.display = "none";
                document.getElementById("textBoxRegisterLastName").style.display = "none";
                document.getElementById("textBoxRegisterEmail").style.display = "none";
                document.getElementById("textBoxRegisterUsername").style.display = "none";
                document.getElementById("textBoxRegisterPassword").style.display = "none";
                document.getElementById("btnRegister").style.display = "none";
                document.getElementById("h1RegisterTitle").style.color = "green";
                document.getElementById("h1RegisterTitle").innerHTML = "Account succesfully created!"

                document.getElementById("registerForm").style.height = "150px";

            }
        })

    }


    return (
        <div className="registerBackground">
            <div className="registerContainer" id="registerForm">
                <div className="CloseBtn">
                    <button id="btnCloseRegisterForm" onClick={() => openPopup(false)}> X </button>
                </div>

                <h1 id="h1RegisterTitle">Register here!</h1>
                <br />
                <input id="textBoxRegisterFirstName" className="body" type="text" placeholder="First name" ></input>
                <label id="labelRegisterFirstName" className="registerLabels">Firstname too short</label>
                <br />
                <input id="textBoxRegisterLastName" className="body" type="text" placeholder="Last name" ></input>
                <label id="labelRegisterLastName" className="registerLabels">Lastname too short</label>
                <br />
                <input id="textBoxRegisterEmail" className="body" type="text" placeholder="Email"  ></input>
                <label id="labelRegisterEmail" className="registerLabels">Invalid Email</label>
                <br />
                <input id="textBoxRegisterUsername" className="body" type="text" placeholder="Username" ></input>
                <label id="labelRegisterUsername" className="registerLabels">Username too short</label>
                <br />
                <input id="textBoxRegisterPassword" className="body" type="password" placeholder="Password"></input>
                <label id="labelRegisterPassword" className="registerLabels">Password too short</label>
                <br />
                <div className="footer">
                    <button id="btnRegister" className="footer" type="button" onClick={addUserToDatabase}>Register</button>
                </div>


            </div>

        </div>

    );
}
export default Register;

