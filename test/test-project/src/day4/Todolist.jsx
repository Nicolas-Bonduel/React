import TodolistContextProvider from './TodolistContext';
import Table from './TodolistComponents/Table';
import './todolist.css';

function Todolist() {


    return (
        <>
            <TodolistContextProvider>

                <div className="disclaimer" style={{"marginTop": "20vh"}}>
                    <p>Hey!</p>
                    <br />
                </div>

                <div id="todolist" className="flex-column">

                    <Table />

                </div>

            </TodolistContextProvider>
        </>
    )

}

export default Todolist;