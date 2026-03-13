import { useState } from 'react'

const ListSpecies = () => {
    const [species, setSpecies] = useState([]);
    return (
        <div className="species-container">
            <p>Hello Species List </p>
        </div>
    )
}

export default ListSpecies;