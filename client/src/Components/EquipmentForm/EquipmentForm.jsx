import { useState } from "react";

const EquipmentForm = ({ onSave }) => {
  const [equipment, setEquipment] = useState({
    name: '',
    type: '',
    price: ''
  });

  const createChangeHandler = (field) => (event) => {
    const { target: { value } } = event;
    setEquipment({...equipment, [field]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    onSave({
      name: equipment.name,
      type: equipment.type,
      price: Number(equipment.price)
    })

    setEquipment({
      name: '',
      type: '',
      price: ''
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="control">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={equipment.name}
          onChange={createChangeHandler('name')} />
      </div>
      <div className="control">
        <label htmlFor="type">Type</label>
        <input
          value={equipment.type}
          onChange={createChangeHandler('type')}
          type="text"
        />
      </div>
      <div className="control">
        <label htmlFor="Price">Price</label>
        <input
          value={equipment.price}
          onChange={createChangeHandler('price')}
          type="number"
        />
      </div>
      <div className="buttons">
        <button type="submit">Save Equipment</button>
      </div>
    </form>
  )
};

export default EquipmentForm;
