import React from 'react'
import axios from 'axios';



function addProjectButtonClick() {
    
    axios.post('http://localhost:3000/api/projects', {
        name: document.getElementById('textBoxAddProjectName').value.trim(),
        userId: '',
        repositoryLink: document.getElementById('textBoxRepositoryLink').value.trim(),
    })


    document.getElementById('allProjectsDiv').innerHTML += '<ProjectGeneral name="test"/>';
    console.log(document.getElementById('allProjectsDiv').innerHTML);

}

export const AddNewProject = ({ openPopup }) => {

    return (
        <div id="AddNewProjectDiv">
            <div className="CloseBtn">
                <button id="btnCloseAddNewProjectForm" onClick={() => openPopup(false)}> X </button>
            </div>

            <h1 id="h1AddNewProjectTitle">Add New Project</h1>
            <br />
            <input id="textBoxAddProjectName" className="body" type="text" placeholder="Name"></input>
            <br />
            <input id="textBoxRepositoryLink" className="body" type="text" placeholder="Github repository link"></input>
            <br />
            <div className="footer">
                <button id="btnAddNewProject" className="footer" type="button" onClick={addProjectButtonClick}>Add</button>
            </div>
        </div>
    )
}

export default AddNewProject;