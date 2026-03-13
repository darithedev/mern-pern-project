import { useState, useEffect } from 'react'
import './ListSPecies.css'

const ListSpecies = () => {
    const [screen, setScreen] = useState("species");
    const [species, setSpecies] = useState([]);
    const codes = [
        { code: "EX", label: "Extinct" },
        { code: "EW", label: "Extinct in the Wild" },
        { code: "CR", label: "Critically Endangered" },
        { code: "EN", label: "Endangered" },
        { code: "VU", label: "Vulnerable" },
        { code: "NT", label: "Near Threatened" },
        { code: "LC", label: "Least Concern" },
        { code: "DD", label: "Data Deficient" },
        { code: "NE", label: "Not Evaluated" }
    ];

    const fetchSpecies = () => {
        fetch("http://localhost:8080/api/species")
        .then((response) => response.json())
        .then((endangeredSpecies) => {
          setSpecies(endangeredSpecies);
        });
    };

    const [selectedSpecie, setSelectedSpecie] = useState();
    const onClickSpecies = (specie) => {
        setSelectedSpecie(specie);
        setScreen("individuals");
    };

    useEffect(() => {
        fetchSpecies();
    }, []);

    return (
        <>
            {screen === "species" && (
                <div className="species-container">
                    <h2>Endangered Species</h2>
                    <ul className="species-card">
                        {species.map((specie) => {
                            return (
                                <li key={specie.id} onClick={() => onClickSpecies(specie)}>
                                    <h3>{specie.common_name}</h3>
                                    <p style={{ fontStyle: "italic" }}>{specie.scientific_name}</p>
                                    <p>Estimated Mature Individuals: {specie.estimated_in_the_wild}</p>
                                    <p>{codes.find((c) => c.code === specie.conservation_code).label}: {specie.conservation_code}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </>
    )
}

export default ListSpecies;