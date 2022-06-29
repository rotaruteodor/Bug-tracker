import Register from './Register'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



async function validateUsernameAndPassword() {

    let userIsValidated = false;

    await axios.get('http://localhost:3000/api/users').then(resp => {



        for (let user of resp.data) {

            if (user.email === document.getElementById('textBoxInputEmail').value) {
                if (user.password === document.getElementById('textBoxInputPassword').value) {
                    userIsValidated = true;
                    document.getElementById('labelLoginWrongCreditentials').style.display = 'none';
                    break;
                }
            }
        }

    });

    return userIsValidated;
}


export const Login = () => {

    const [openRegister, setOpenRegisterPopup] = useState(false);

    let navigate = useNavigate();


    return (
        <div id="loginDiv">
            <p className="Login" id="loginText">Login</p>
            <input id="textBoxInputEmail" className="Login" type="text" placeholder="Email address"></input>
            <br />
            <input id="textBoxInputPassword" className="Login" type="password" placeholder="Password"></input>
            <br />


            <button id="btnLogin" className="Login" type="button" onClick={() => validateUsernameAndPassword().then(res => res ? navigate('allProjects', {state:{currentLoggedInUserEmail : document.getElementById('textBoxInputEmail').value}}) : document.getElementById('labelLoginWrongCreditentials').style.display = 'block')}>Enter</button>
            <br />
            <label id="labelLoginWrongCreditentials" className="registerLabels">Wrong creditentials</label>
            <p id="paragraphNoAccount" className="Login">Don't have an account yet?</p>
            <button id="openRegisterPopupBtn" onClick={() => setOpenRegisterPopup(true)}>Create one</button>
            {openRegister && <Register openPopup={setOpenRegisterPopup} />}
        </div>
    )
}

export default Login;