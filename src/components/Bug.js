import React from 'react'

export const Bug = (props) => {
    return (
        <div id='mainBugDiv'>
            <p id="bugPriority" className='bugTags'>  {typeof props.bug.priority === 'undefined' ? 'Unknown priority (error occured)' : 'Priority: ' + props.bug.priority}</p>
            <p id="bugSeverity" className='bugTags'>  {typeof props.bug.severity === 'undefined' ? 'Unknown severity (error occured)' : 'Severity: ' + props.bug.severity}</p>
            <p id="bugDescription" className='bugTags'>  {typeof props.bug.description === 'undefined' ? 'Unknown description (error occured)' : 'Description: ' + props.bug.description}</p>
            <a id="bugLink" className='bugTags' href={typeof props.bug.commitLink === 'undefined' ? 'Unknown link (error occured)' : props.bug.commitLink} >Commit link</a>
            <br/>
        </div>
    )
}
