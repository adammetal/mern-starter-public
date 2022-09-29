import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const updateEmployee = (id, employee) => {
  return fetch(`/api/employees/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setLoading(false);
        setName(employee.name);
        setLevel(employee.level);
        setPosition(employee.position);
      })
      .then((error) => {
        console.log(error);
      });
  }, [id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleUpdateEmployee = (event) => {
    event.preventDefault();
    setLoading(true);
    updateEmployee(id, { name, level, position })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <form disabled={loading} onSubmit={handleUpdateEmployee}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            required
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="level">Level</label>
          <input
            required
            id="level"
            type="text"
            value={level}
            onChange={handleLevelChange}
          />
        </div>
        <div>
          <label htmlFor="position">Position</label>
          <input
            required
            id="position"
            type="text"
            value={position}
            onChange={handlePositionChange}
          />
        </div>
        <div>
          <button type="submit">
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeUpdater;
