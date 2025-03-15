import {Link} from "react-router-dom";
const ListItem = () => {
    return (
        <div className="listItem">
            <input type="text" placeholder="Note Description"/>
            <Link to="/note">edit</Link>
        </div>
    )
}

export default ListItem
