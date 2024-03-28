import propTypes from "prop-types";

function Student({name, notes}) {

    const average = (notes.reduce( ( p, c ) => p + c, 0 ) / notes.length).toFixed(2);

  return (
    <>
      <li>
        student: {name}; average: {average}
      </li>
    </>
  )
}

// Type Checking
Student.propTypes = {
    name: propTypes.string.isRequired,
    notes: propTypes.arrayOf(
        propTypes.oneOfType([propTypes.number])
    ).isRequired,

    name: function(props, propName, componentName) {
        const val = props[propName];
        if (val.length === 0) return new Error(`${propName} must not be empty`);
    },

    notes: function(props, propName, componentName) {
        const val = props[propName]
        if (val.length === 0) return new Error(`${propName} must have at least one element`);
    },
}

export default Student
