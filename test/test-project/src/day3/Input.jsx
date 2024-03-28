function Input({val1, err1, val2, err2, onInputChange}) {

    return (
        <>
            <input type="text" name="input1" value={val1} onChange={onInputChange} />
            <p style={{"color": "red"}}>{err1}</p>
            <input type="text" name="input2" value={val2} onChange={onInputChange} />
            <p style={{"color": "red"}}>{err2}</p>
        </>
    )

}

export default Input;