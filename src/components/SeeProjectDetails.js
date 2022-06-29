import React, { Component } from 'react'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Bug } from './Bug';

export const SeeProjectDetails = (props) => {

    let navigate = useNavigate();
    const location = useLocation();


    const [usersArray, setUsersArray] = useState([]);
    const [membersArray, setMembersArray] = useState([]);
    const [testersArray, setTestersArray] = useState([]);
    const [bugsArray, setBugsArray] = useState([]);


    useEffect(() => {

        let fetchUsers = async () => {
            await axios.get('http://localhost:3000/api/users').then(resp => { setUsersArray(resp.data) });
        }

        let fetchMembers = async () => {
            await axios.get('http://localhost:3000/api/members').then(resp => { setMembersArray(resp.data) });
        }

        let fetchTesters = async () => {
            await axios.get('http://localhost:3000/api/testers').then(resp => { setTestersArray(resp.data) });
        }
        let fetchBugs = async () => {
            await axios.get('http://localhost:3000/api/bugs').then(resp => { setBugsArray(resp.data) });
        }

        fetchUsers();
        fetchMembers();
        fetchTesters();
        fetchBugs();



    }, []);

    useEffect(() => {
        if (testersArray.filter(m => m.userId === usersArray.find(i => i.email == location.state.currentUserEmail).id && m.projectId === location.state.project.id).length === 0) {
            document.getElementById("buttonBecomeTester").style.visibility = 'visible';
        }
        else {
            document.getElementById("buttonBecomeTester").style.visibility = 'hidden';

        }
        if (membersArray.filter(m => m.userId === usersArray.find(i => i.email == location.state.currentUserEmail).id && m.projectId === location.state.project.id).length === 0) {
            document.getElementById("buttonBecomeMember").style.visibility = 'visible';
        }
        else {
            document.getElementById("buttonBecomeMember").style.visibility = 'hidden';

        }

    }, [testersArray, usersArray, membersArray]);



    function onAddProjectBugClick() {
        let inputsAreValid = true;

        let newBug = {
            priority: document.getElementById('textBoxAddBugPriority').value.trim(),
            severity: document.getElementById('textBoxAddBugSeverity').value.trim(),
            description: document.getElementById('textBoxAddDescription').value.trim(),
            commitLink: document.getElementById('textBoxAddBugCommitLink').value.trim(),
            projectId: location.state.project.id,
            userId: usersArray.find(i => i.email == location.state.currentUserEmail).id,
        }


        if (newBug.description.length < 4) {
            document.getElementById('labelAddBugDescription').style.display = 'block';
            inputsAreValid = false;
        }
        else {
            document.getElementById('labelAddBugDescription').style.display = 'none';
        }

        if (newBug.severity > 10) {
            document.getElementById('labelAddBugSeverity').style.display = 'block';
            inputsAreValid = false;
        }
        else {
            document.getElementById('labelAddBugSeverity').style.display = 'none';
        }
        if (newBug.priority > 10) {
            document.getElementById('labelAddBugPriority').style.display = 'block';
            inputsAreValid = false;
        }
        else {
            document.getElementById('labelAddBugPriority').style.display = 'none';
        }
        if (inputsAreValid) {


            axios.post('http://localhost:3000/api/bugs', newBug).then((response) => {
                setBugsArray(bugsArray.concat(response.data));
            })
        }



    }
    function onBecomeMemberClick() {
        let newMember = {
            userId: usersArray.find(i => i.email == location.state.currentUserEmail).id,
            projectId: location.state.project.id
        }


        if (membersArray.filter(m => m.userId === usersArray.find(i => i.email == location.state.currentUserEmail).id && m.projectId === location.state.project.id).length === 0) {
            axios.post('http://localhost:3000/api/members', newMember).then((response) => {
                setMembersArray(membersArray.concat(response.data));
            }).then(() => {
                let testerToDeleteId = testersArray.find(t => t.userId === usersArray.find(i => i.email == location.state.currentUserEmail).id && t.projectId === location.state.project.id).id;
                axios.delete(`http://localhost:3000/api/testers/${testerToDeleteId}`);

                let newTestersArray = testersArray.filter(t => t.id !== testerToDeleteId)
                setTestersArray(newTestersArray);
            })
        }

        else {
            alert("You are already a member!")
        }


    }

    function onBecomeTesterClick() {
        let newTester = {
            userId: usersArray.find(i => i.email == location.state.currentUserEmail).id,
            projectId: location.state.project.id
        }

        if (testersArray.filter(m => m.userId === usersArray.find(i => i.email == location.state.currentUserEmail).id && m.projectId === location.state.project.id).length === 0) {
            axios.post('http://localhost:3000/api/testers', newTester).then((response) => {
                setTestersArray(testersArray.concat(response.data));
            }).then(() => {
                let memberToDeleteId = membersArray.find(m => m.userId === usersArray.find(i => i.email == location.state.currentUserEmail).id && m.projectId === location.state.project.id).id;
                axios.delete(`http://localhost:3000/api/members/${memberToDeleteId}`);

                let newMembersArray = membersArray.filter(m => m.id !== memberToDeleteId)
                setMembersArray(newMembersArray);
            })
        }
        else {
            alert("You are already a tester!")
        }

    }

    return (
        <div>

            <div id="projectDetailsGeneralDiv">
                <a id="projectTitleFromDetails" href={location.state.project.repositoryLink}>{location.state.project.name}</a>
                <p id="projectCreatorFromDetails">{'Creator: ' + location.state.creator.username}</p>

                <button type='button' id='buttonBecomeMember' onClick={onBecomeMemberClick}>Become member</button>
                <button type='button' id='buttonBecomeTester' onClick={onBecomeTesterClick}>Become tester</button>
            </div>

            <hr />

            <div id="testersListDiv">
                <h1 id="testersHeader">Testers</h1>
                <ol id='testersListOL'>
                    {
                        usersArray.filter(u => testersArray.filter(x => x.projectId == location.state.project.id).map(y => y.userId).includes(u.id)).map(q => <li>{q.username}</li>)
                    }
                </ol>
            </div>

            <div id="membersListDiv">
                <h1 id="membersHeader">Members</h1>
                <ol id='membersListOL'>
                    {
                        usersArray.filter(u => membersArray.filter(x => x.projectId == location.state.project.id).map(y => y.userId).includes(u.id)).map(q => <li>{q.username}</li>)
                    }
                </ol>
            </div>

            <hr />

            <div id="bugInputsDiv">
                <h1 id="addBugHeader">Add a bug here</h1>
                <input id="textBoxAddBugSeverity" type="number" placeholder="Severity"></input>
                <label id="labelAddBugSeverity" className="addNewProjectLabels">Severity out of range!</label>
                <br />
                <input id="textBoxAddBugPriority" type="number" placeholder="Priority"></input>
                <label id="labelAddBugPriority" className="addNewProjectLabels">Severity out of range!</label>
                <br />
                <input id="textBoxAddDescription" type="text" placeholder="Description"></input>
                <label id="labelAddBugDescription" className="addNewProjectLabels">Description is too short</label>
                <br />
                <input id="textBoxAddBugCommitLink" type="text" placeholder="Commit link"></input>
                <br />
                <button type='button' id='buttonAddBug' onClick={onAddProjectBugClick}>Add bug</button>
            </div>

            <hr />

            <div id="bugsListDiv">
            <h1 id="bugsLisitHeader">All bugs</h1>
                {
                    bugsArray
                        .filter(p => p.projectId === location.state.project.id)
                        .map(x => <Bug bug={x} />)

                }
            </div>
        </div>
    )
}
