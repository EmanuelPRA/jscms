import { useState } from "react"
import AdminPost from "./admincomps/post"
import Edit from "./admincomps/Edit"
function Admin(){
    const [admin, setAdmin] = useState("New")
    const [postID, setPostID] = useState(0)

    function DashboardNav() {
        return(
            <ul>
                <li><a href="" onClick={e =>{e.preventDefault();setAdmin("All")} }>All</a></li>
                <li><a href="" onClick={e => {e.preventDefault();setAdmin("New")}}>New</a></li>
                <li><a href="" onClick={e => {e.preventDefault();setAdmin("Edit")}}>Edit</a></li>
            </ul>
        )
    }


    switch (admin) {
        case "New":
            return(
                <>
                <DashboardNav/>
                <AdminPost/>
                </>
            )

        case "Edit":
            return(
                <>
                <DashboardNav/>
                <Edit/>
                </>
            )

        case "All":
            return(
                <>
                <DashboardNav/>
                <h2>All posts</h2>
                </>
            )
        default:
            break;
    }
    
}

export default Admin