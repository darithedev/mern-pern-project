import { useState, useEffect } from 'react'

const ListIndividuals = ({ speciesId }) => {
    const [individuals, setIndividuals] = useState([]);
    const [filteredIndivs, setFilteredIndivs] = useState([]);
    // const [sightings, setSightings] = useState([]);

    const fetchIndividuals = () => {
        fetch("http://localhost:8080/api/individuals")
        .then((response) => response.json())
        .then((individualAnimals) => {
          setIndividuals(individualAnimals);
          const indivs = individualAnimals.filter((i) => i.species_id === parseInt(speciesId));
          setFilteredIndivs(indivs);
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
    }, [speciesId]);
    
    return (
        <div className="individual-container">
            <p>Hello List Individuals</p>
        </div>
    )
}

export default ListIndividuals