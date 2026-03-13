import { useState } from 'react'

const ListIndividuals = () => {
    const [individuals, setIndividuals] = useState([]);
    const [sightings, setSightings] = useState([]);
    
    return (
        <div className="individual-container">
            <p>Hello List Individuals</p>
        </div>
    )
}

export default ListIndividuals