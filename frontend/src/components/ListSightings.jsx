import { useState, useEffect } from 'react'
import './ListSightings.css'
import * as IoIcons from 'react-icons/io5'

const ListSightings = ({ updateScreen }) => {
    const [sightings, setSightings] = useState([]);

    const fetchSightings = () => {
      fetch("http://localhost:8080/api/sightings")
        .then((response) => response.json())
        .then((individualSightings) => {
          setSightings(individualSightings);
        });
    };

    const putSighting = (sighting) => {
        return fetch(`http://localhost:8080/api/sightings/${sighting.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toEditEvent)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            clearForm();
        });
    };

    const onDelete = (sightingId) => {
        return fetch(`http://localhost:8080/api/sightings/${sightingId}`, {
            method: "DELETE"
        }).then((response) => {
            if (response.ok) {
                fetchSightings();
            }
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
                            <button
                                onClick={() => onDelete(sighting.id)}
                                style={{ padding: "0.6em", marginRight: "0.9em" }}
                            >
                                <IoIcons.IoTrash />
                            </button>
                            <button
                                onClick={() => alert("Editing feature is coming soon!")}
                                style={{ padding: "0.6em" }}
                            >
                                <IoIcons.IoSync />
                            </button>
                        </li>
                    );
                })}
            </ul>
            <button onClick={() => updateScreen("species")}>Go Back</button>
        </div>
    )
}

export default ListSightings;