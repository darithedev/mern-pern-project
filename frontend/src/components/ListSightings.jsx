import { useState, useEffect } from 'react'

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
            
        </div>
    )
}

export default ListSightings;