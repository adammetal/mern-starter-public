import { useState } from "react";
import { useNavigate } from "react-router-dom";

const createEmployee = (employee) => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleCreateEmployee = (event) => {
    event.preventDefault();
    setLoading(true);
    createEmployee({ name, level, position })
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
      <form onSubmit={handleCreateEmployee}>
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
          <button type="submit" disabled={loading}>
            Create Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeCreator;
