import { useEffect, useState } from 'react';
import { getPlants, postPlant } from '../../api/requests';
import { Plant } from '../../types';

export function PlantList() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    getPlants().then(setPlants);
    return () => {
      // cancel state update TODO -> add an isMounted hook
    };
  }, []);

  function handleAddPlant() {
    postPlant().then(console.log); // TODO -> on success, update UI state
  }

  return (
    <div>
      <button onClick={handleAddPlant}>add plant</button>
      <p>PLANTS: {JSON.stringify(plants)}</p>
    </div>
  );
}
