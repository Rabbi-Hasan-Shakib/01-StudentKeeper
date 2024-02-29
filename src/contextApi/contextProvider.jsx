import { useState } from "react";
import { userContext } from "./createContext";

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const deleteUser = (id) => {
    setUsers(
      users.filter((value) => {
        return value.id !== id;
      })
    );
  };
  const updateUser = (id, name, age) => {
    const affectedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, name: name, age: age };
      }
      return user;
    });
    setUsers(affectedUsers);
  };
  return (
    <userContext.Provider value={[users, setUsers, deleteUser, updateUser]}>
      {children}
    </userContext.Provider>
  );
};
