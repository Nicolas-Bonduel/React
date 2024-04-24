import { useDispatch, useSelector } from "react-redux";
import { setChecked } from "../store/slice/todolistSlice";


function Todolist() {

  const todolist = useSelector((state) => state.todolist.todolist);
  const dispatch = useDispatch();

  return (
    <>
      {
        todolist.length ?
          (
            <>
              <h2>Todolist :</h2>

              <table>

                <thead>

                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>

                </thead>

                <tbody>

                  {
                    todolist.map((todo, idx) => (
                      <tr key={todo.id}>
                        <td>
                          <input type="checkbox" checked={todo.checked} onChange={(e) => dispatch( setChecked({ id:todo.id, checked: !todo.checked }) )} />
                        </td>
                        <td>
                          <p style={todo.checked ? {textDecoration: 'line-through'} : {}}>{todo.title}</p>
                        </td>
                        <td>
                          <p style={todo.checked ? {textDecoration: 'line-through'} : {}}>{todo.description}</p>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>

              </table>
            </>
          )
          :
          (
            <></>
          )
      }
    </>
  )
}

export default Todolist;