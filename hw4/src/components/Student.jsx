const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <strong>Major:</strong> {props.major}<br/>
        <p>{props.name.first} is taking {props.credit} credits
            and {props.wisc ? "is" : "is not"} from Wisconsin.</p>
        <p>They have {props.interests.length} interests including</p>
        <ul>
        {
            props.interests.map((interest) => {
                return <li key={interest}>{interest}</li>
            })
        }
        </ul>
    </div>
}

export default Student;
