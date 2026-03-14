import { useState, useEffect } from 'react'
import './ListSightings.css'
import * as IoIcons from 'react-icons/io5'

const ListSightings = ({ updateScreen }) => {
    const [sightings, setSightings] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchSightings = (start, end) => {
        const url = start && end
            ? `http://localhost:8080/api/sightings?start=${start}&end=${end}`
            : "http://localhost:8080/api/sightings";

        fetch(url)
            .then((response) => response.json())
            .then((individualSightings) => {
            setSightings(individualSightings);
        });
    };

    const onSearch = (e) => {
        e.preventDefault();
        fetchSightings(startDate, endDate);
    };

    const clearForm = () => {
        setStartDate("");
        setEndDate("");
        fetchSightings();
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
            <form onSubmit={onSearch}>
                <label>Start Date: </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                
                <label>End Date: </label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                
                <button type="submit">Search</button>
                <button type="button" onClick={clearForm}>Clear</button>
            </form>
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