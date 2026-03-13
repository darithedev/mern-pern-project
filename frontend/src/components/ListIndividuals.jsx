import { useState, useEffect } from 'react'
import './ListIndividuals.css'

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
            <div className="list-individuals">
                <h2>Endangered Animals Tracked</h2>
                {/*<ListSightings /> this is the search bar where date start - end is filtered*/}
                <ul className="individual-card">
                    {filteredIndivs.map((individual) => {
                        return (
                            <li key={individual.id}>
                                <h3>{individual.nick_name}</h3>
                                <p>Tracked by: {individual.scientist_tracking}</p>
                                <p>Total Sightings: {individual.sighting_count}</p>
                                <p>First Sighting: {individual.first_sighting}</p>
                                <p>Last Sighting: {individual.last_sighting}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default ListIndividuals