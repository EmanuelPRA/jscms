export default function Stories( props){
    return(
        <>
            <h1>Stories</h1>
            {props.theme ? <h2>{props.theme}</h2> : <></>}
        </>
    )
}