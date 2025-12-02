import { useState } from "react"
import AdminPost from "./admincomps/post"
import Edit from "./admincomps/Edit"
function Admin(){
    const [admin, setAdmin] = useState("New")
    const [postID, setPostID] = useState(0)

    switch (admin) {
        case "New":
            return(<AdminPost/>)
            break;
        case "Edit":
            return(<Edit/>)
            break;
        case "All":
            return(<h1>All posts</h1>)
            break;
        default:
            break;
    }
    
}

export default Admin