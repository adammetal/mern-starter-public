import { useEffect, useState } from "react";

const URL = 'https://api.thecatapi.com/v1/images/search';

const ImageSelector = ({ onSelect, selected }) => {
  const [kitten, setKitten] = useState(null);

  const getRandomCat = async () => {
    const res = await fetch(URL);
    const kitten = (await res.json())[0];
    setKitten(kitten);
  }

  useEffect(() => {
    getRandomCat();
  }, []);

  if (selected === true) {
    return (
      <div>
        <img src={kitten.url} />
      </div>
    )
  }

  if (kitten === null) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <img style={{ maxHeight: '200px' }} src={kitten.url} />
      <button type="button" onClick={() => onSelect(kitten.url)}>This one</button>
      <button type="button" onClick={() => getRandomCat()}>Noooo this is not that cat</button>
    </div>
  )
}

export default ImageSelector;
