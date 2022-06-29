import React from 'react'
import { useNavigate } from "react-router-dom";


export const ProjectMember = (props) => {

    let navigate = useNavigate();
    


    return (
        <div id="memberProjectDiv">
            <a id='projectTitleTag' className="paragraphProjectTitle" onClick={() => navigate('currentSelectedProject', {state:{project : props.project, creator : props.creator, currentUserEmail : props.currentUserEmail}})}>
                {typeof props.project === 'undefined' ? 'Unknown project name (error occured)' : props.project.name}
            </a>
            <br />
            <p className="paragraphProjectCreator">
                {typeof props.creator === 'undefined' ? 'Unknown creator (error occured)' : props.creator.username}
            </p>
        </div>

    )
}

export default ProjectMember;