import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KittenCreator from '../Components/KittenCreator';

const EmployeeKittens = () => {
  const { id } = useParams();
  const [kittens, setKittens] = useState([]);

  const handleKittenAdded = async (kitten) => {
    const url = `/api/employees/${id}/kittens`;
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(kitten)
    });

    const saved = await res.json();
    setKittens([...kittens, saved]);
  }

  useEffect(() => {
    const url = `/api/employees/${id}/kittens`;
    
    (async () => {
      const res = await fetch(url);
      const kittens = await res.json();
      setKittens(kittens);
    })()
  }, [id]);

  return (
    <>
      <KittenCreator onKittenAdded={handleKittenAdded} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {kittens.map((kitten) => (
            <tr key={kitten._id}>
              <td>{kitten.name}</td>
              <td><img style={{ maxHeight: '300px' }} src={kitten.img} /></td>
              <td>{kitten.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default EmployeeKittens;
