import { useState, useEffect } from 'react'
import './ListSightings.css'

const ListSightings = ({ updateScreen }) => {
    const [sightings, setSightings] = useState([]);
    const [editingSighting, setEditingStghting] = useState(null);

    const fetchSightings = () => {
      fetch("http://localhost:8080/api/sightings")
        .then((response) => response.json())
        .then((individualSightings) => {
          setSightings(individualSightings);
        });
    };

    useEffect(() => {
        fetchSightings();
    }, []);

    return (
        <div className="list-sightings-container">
            <h2>Animals Tracked Sightings</h2>
            <ul className="sighting-card">
                {sightings.map((sighting) => {
                    return (
                        <li className="sightings-card" key={sighting.id}>
                            <p>Animal: {sighting.nick_name}</p>
                            <p>Date Sighted: {sighting.sighting ? new Date(sighting.sighting).toLocaleDateString() : "No Sightings"}</p>
                            <p>Location: {sighting.location}</p>
                            <p>Health: {sighting.healthy ? "Healthy" : "Not Healthy"}</p>
                            <p>Contact of Person Tracking: {sighting.sighted_by_email}</p>
                        </li>
                    );
                })}
            </ul>
            <button onClick={() => updateScreen("species")}>Go Back</button>
        </div>
    )
}

export default ListSightings;