import { useContext, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { userContext } from "./contextApi/createContext";

const App = () => {
  const [users, setUsers, deleteUser, updateUser] = useContext(userContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const [edit, setEdit] = useState(false);
  const [currentName, setCurrentName] = useState(null);
  const [currentAge, setCurrentAge] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const id = Date.now();
  const user = {
    id,
    name,
    age,
  };
  const handleEdit = (user) => {
    setEdit(true);
    setCurrentName(user.name);
    setCurrentAge(user.age);
    setCurrentId(user.id);
    nameRef.current.value = user.name;
    ageRef.current.value = user.age;
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(currentId, currentName, currentAge, currentAge);
    nameRef.current.value = "";
    ageRef.current.value = "";
    setEdit(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, user]);
    nameRef.current.value = "";
    ageRef.current.value = "";
  };

  return (
    <div className="container">
      <h1 className="text-center">List of Students</h1>
      {edit ? (
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              ref={nameRef}
              onChange={(e) => setCurrentName(e.target.value)}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              ref={ageRef}
              onChange={(e) => setCurrentAge(e.target.value)}
              aria-describedby="emailHelp"
            />
          </div>
          <button className="btn btn-primary  mb-5" type="submit">
            Edit
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              ref={nameRef}
              onChange={(e) => setName(e.target.value)}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              ref={ageRef}
              onChange={(e) => setAge(e.target.value)}
              aria-describedby="emailHelp"
            />
          </div>
          <button className="btn btn-primary  mb-5" type="submit">
            Add
          </button>
        </form>
      )}

      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Age</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {user &&
            users.map((user, index) => {
              return (
                <tr key={user}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td className="text-danger text-center">
                    <button onClick={() => handleEdit(user)}>✏️</button>
                  </td>
                  <td className="text-danger text-center">
                    <button onClick={() => deleteUser(user.id)}>❌</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default App;
