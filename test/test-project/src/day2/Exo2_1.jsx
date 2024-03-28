import Student from './Student.jsx';

function Exo2_1() {

    const students = [
        { notes: [12, 11, 10], name: "Alan" },
        { notes: [18, 10, 19], name: "Alice" },
        { notes: [10, 9, 11], name: "Bernard" },
        { notes: [11, 17, 19], name: "Sophie" },
    ];

    return (
        <>
            <ul>
                { students.map((student, idx) => <Student key={idx} {...student} />) }
            </ul>
        </>
    )

}
export default Exo2_1
