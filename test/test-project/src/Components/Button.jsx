export default function Button(props) {

    return (
        <button style={{"background": props.background}}>{props.text}</button>
    )

}