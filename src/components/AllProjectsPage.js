import React from 'react'
import ProjectGeneral from './ProjectGeneral';
import ProjectMember from './ProjectMember';
import ProjectTester from './ProjectTester';
import { useState, useEffect } from 'react';
import AddNewProject from './AddNewProject';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export const AllProjectsPage = ({ props }) => {

    const location = useLocation();


    const [openRegister, setOpenRegisterPopup] = useState(false);
    const [projectsArray, setProjectsArray] = useState([]);
    const [usersArray, setUsersArray] = useState([]);
    const [membersArray, setMembersArray] = useState([]);
    const [testersArray, setTestersArray] = useState([]);



    useEffect(() => {

        let fetchProjects = async () => {
            await axios.get('http://localhost:3000/api/projects').then(resp => { setProjectsArray(resp.data) });
        }

        let fetchUsers = async () => {
            await axios.get('http://localhost:3000/api/users').then(resp => { setUsersArray(resp.data); });
        }

        let fetchMembers = async () => {
            await axios.get('http://localhost:3000/api/members').then(resp => { setMembersArray(resp.data) });
        }

        let fetchTesters = async () => {
            await axios.get('http://localhost:3000/api/testers').then(resp => { setTestersArray(resp.data) });
        }

        fetchProjects();
        fetchUsers();
        fetchMembers();
        fetchTesters();

    }, []);


    function onAddProjectButtonClick() {
        let inputsAreValid = true;

        let newProject = {
            name: document.getElementById('textBoxAddProjectName').value.trim(),
            userId: usersArray.find(i => i.email == location.state.currentLoggedInUserEmail).id,
            repositoryLink: document.getElementById('textBoxRepositoryLink').value.trim(),
        }


        if (newProject.name.length < 4) {
            document.getElementById('labelAddProjectName').style.display = 'block';
            inputsAreValid = false;
        }
        else {
            document.getElementById('labelAddProjectName').style.display = 'none';
        }

        if (newProject.repositoryLink.length < 4) {
            document.getElementById('labelAddProjectRepoLink').style.display = 'block';
            inputsAreValid = false;
        }
        else {
            document.getElementById('labelAddProjectRepoLink').style.display = 'none';
        }


        if (inputsAreValid) {

            axios.post('http://localhost:3000/api/projects', newProject).then((response) => {
                setProjectsArray(projectsArray.concat(response.data));

            })
                .then(() => {
                    axios.post('http://localhost:3000/api/members', {
                        userId: newProject.userId, projectId: Math.max(...projectsArray.map(x => x.id)) + 1
                    }).then((response) => {
                        setMembersArray(membersArray.concat(response.data));

                    })
                })

        }

    };



    return (
        <div id="allProjectMainDiv">

            <h1 id="addNewProjectHeader">Add a new project here!</h1>
            <input id="textBoxAddProjectName" className="body" type="text" placeholder="Project name"></input>
            <label id="labelAddProjectName" className="addNewProjectLabels">Name is too short</label>
            <br />
            <input id="textBoxRepositoryLink" className="body" type="text" placeholder="Repository link"></input>
            <label id="labelAddProjectRepoLink" className="addNewProjectLabels">Repo is too short</label>
            <br />
            <button id="btnAddProject" type="button" onClick={onAddProjectButtonClick}>Add Project</button> {/* onClick={() => setOpenRegisterPopup(true)}*/}
            <hr />

            {openRegister && <AddNewProject openPopup={setOpenRegisterPopup} />}


            <div id="memberProjectsDiv">
                <h1 className='projectsHeaders'>You are a member in:</h1>
                {
                    projectsArray
                        .filter(p => membersArray.filter(m => m.userId === (usersArray.find(u => u.email === location.state.currentLoggedInUserEmail) === undefined ? 'nothing' : usersArray.find(ux => ux.email === location.state.currentLoggedInUserEmail).id)).map(y => y.projectId).includes(p.id))
                        .map(x => <ProjectMember project={x} creator={usersArray.find(i => i.id === x.userId)} currentUserEmail={location.state.currentLoggedInUserEmail} />)
                }
            </div>

            <hr />

            <div id="testerProjectsDiv">
                <h1 className='projectsHeaders'>You are a tester in:</h1>
                {
                    projectsArray
                        .filter(p => testersArray.filter(m => m.userId === (usersArray.find(u => u.email === location.state.currentLoggedInUserEmail) === undefined ? 'nothing' : usersArray.find(ux => ux.email === location.state.currentLoggedInUserEmail).id)).map(y => y.projectId).includes(p.id))
                        .map(x => <ProjectTester project={x} creator={usersArray.find(i => i.id === x.userId)} currentUserEmail={location.state.currentLoggedInUserEmail} />)
                }

            </div>

            <hr />

            <div id="allProjectsDiv">
                <h1 className='projectsHeaders'>All projects:</h1>
                {
                    projectsArray
                        .filter(p => !membersArray.filter(m => m.userId === (usersArray.find(u => u.email === location.state.currentLoggedInUserEmail) === undefined ? 'nothing' : usersArray.find(ux => ux.email === location.state.currentLoggedInUserEmail).id)).map(y => y.projectId).includes(p.id))
                        .filter(p => !testersArray.filter(m => m.userId === (usersArray.find(u => u.email === location.state.currentLoggedInUserEmail) === undefined ? 'nothing' : usersArray.find(ux => ux.email === location.state.currentLoggedInUserEmail).id)).map(y => y.projectId).includes(p.id))
                        .map(x => <ProjectGeneral project={x} creator={usersArray.find(i => i.id === x.userId)} currentUserEmail={location.state.currentLoggedInUserEmail} />)
                }


            </div>

        </div>
    )




}

export default AllProjectsPage;