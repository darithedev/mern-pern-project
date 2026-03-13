import { useState, useEffect } from 'react'
import './ListIndividuals.css'
import IndividualForm from './IndividualForm.jsx';
import SightingForm from './SightingForm.jsx'

const ListIndividuals = ({ updateScreen, speciesId, speciesName }) => {
    const [screen, setScreen] = useState("individuals");
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
        <>
            {screen === "individuals" && (
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
                                        <p>First Sighting: {individual.first_sighting ? individual.first_sighting : "No Sightings"}</p>
                                        <p>Last Sighting: {individual.last_sighting ? individual.last_sighting : "No Sightings"}</p>
                                    </li>
                                )
                            })}
                        </ul>
                        <button id="add-button" onClick={() => setScreen("addIndividual")}>Add Individual</button>
                        <button id="add-button" onClick={() => setScreen("addSighting")}>Add Sighting</button>
                        <button onClick={() => updateScreen("species")}>Back</button>
                    </div>
                </div>
            )}

            {screen === "addIndividual" && (
                <IndividualForm 
                    setScreen={setScreen}
                    speciesId={speciesId}
                    speciesName={speciesName}
                    fetchIndividuals={fetchIndividuals}
                />
            )}

            {screen === "addSighting" && (
                <SightingForm 
                    setScreen={setScreen}
                    filteredIndivs={filteredIndivs}
                />
            )}
        </>
    )
}

export default ListIndividuals