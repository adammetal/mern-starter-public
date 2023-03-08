import { useEffect, useState } from "react";
import EquipmentForm from "../EquipmentForm/EquipmentForm";

import './EmployeeEquipments.css';

const EmployeeEquipments = ({ employeeId }) => {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    fetch(`/api/employees/${employeeId}/equipments`)
      .then(res => res.json())
      .then(res => setEquipments(res));
  }, [employeeId]);

  const handleSave = async (equipment) => {
    const res = await fetch('/api/equipments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...equipment, employee: employeeId })
    })

    const saved = await res.json();
    setEquipments([...equipments, saved]);
  }

  return (
    <div className="employee-equipment">
      <h2>Equipments</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map(equipment => (
            <tr key={equipment._id}>
              <td>{equipment.name}</td>
              <td>{equipment.type}</td>
              <td>{equipment.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EquipmentForm onSave={handleSave} />
    </div>
  )
}

export default EmployeeEquipments;
