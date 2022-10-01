const EmployeeForm = ({ onSave, disabled, employee }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(employee);
  };

  return (
    <form onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          required
          id="name"
          name="name"
          type="text"
          defaultValue={employee ? employee.name : null}
        />
      </div>
      <div>
        <label htmlFor="level">Level</label>
        <input
          required
          id="level"
          name="level"
          type="text"
          defaultValue={employee ? employee.level : null}
        />
      </div>
      <div>
        <label htmlFor="position">Position</label>
        <input
          required
          id="position"
          name="position"
          type="text"
          defaultValue={employee ? employee.position : null}
        />
      </div>
      <div>
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
