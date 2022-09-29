import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const Employees = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setData(employees);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setData(null);
        setLoading(false);
        setError(error);
        console.log(error);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data || !data.length || !Array.isArray(data)) {
    return <h1>No employees yet</h1>;
  }

  return (
    <div>
      <Link to="/create">Create employee</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <Link to={`/update/${employee._id}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
