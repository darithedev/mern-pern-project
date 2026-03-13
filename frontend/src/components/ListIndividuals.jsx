import { useState, useEffect } from 'react'

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

    // Likely ot be moved to its own component ListSighting.jsx
    /*const fetchSightings = () => {
        fetch("http://localhost:8080/api/sightings")
        .then((response) => response.json())
        .then((individualSightings) => {
          setSightings(individualSightings);
        });
    };*/

    useEffect(() => {
        fetchIndividuals();
    }, []);
    
    return (
        <div className="individual-container">
            <p>Hello List Individuals</p>
        </div>
    )
}

export default ListIndividuals