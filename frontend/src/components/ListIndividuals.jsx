import { useState } from 'react'

const ListIndividuals = () => {
    const [individuals, setIndividuals] = useState([]);
    const [sightings, setSightings] = useState([]);

    const fetchIndividuals = () => {
        fetch("http://localhost:8080/api/individuals")
        .then((response) => response.json())
        .then((individualAnimals) => {
          setIndividuals(individualAnimals);
        });
    };

    const fetchSightings = () => {
        fetch("http://localhost:8080/api/sightings")
        .then((response) => response.json())
        .then((individualSightings) => {
          setSightings(individualSightings);
        });
    };
    
    return (
        <div className="individual-container">
            <p>Hello List Individuals</p>
        </div>
    )
}

export default ListIndividuals