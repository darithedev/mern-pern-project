import { useState } from 'react'

const ListSpecies = () => {
    const [species, setSpecies] = useState([]);

    const fetchSpecies = () => {
        fetch("http://localhost:8080/api/species")
        .then((response) => response.json())
        .then((endangeredSpecies) => {
          setIndividuals(endangeredSpecies);
        });
    };

    return (
        <div className="species-container">
            <p>Hello Species List </p>
        </div>
    )
}

export default ListSpecies;