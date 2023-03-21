import { useState } from "react";
import ImageSelector from "./ImageSelector";

const KittenCreator = ({ onKittenAdded }) => {
  const [img, setImg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    const kitten = {
      name: formData.get('name'),
      age: formData.get('age'),
      img,
    }

    onKittenAdded(kitten);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          id="name"
        />
      </div>
      <div className="control">
        <ImageSelector onSelect={(url) => setImg(url)} selected={img !== ""}/>
      </div>
      <div className="control">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
        />
      </div>
      <div className="buttons">
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default KittenCreator;
