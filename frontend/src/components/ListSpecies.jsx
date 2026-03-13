import { useState, useEffect } from 'react'

const ListSpecies = () => {
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

    useEffect(() => {
        fetchSpecies();
    }, []);

    return (
        <div className="species-container">
            <p>Hello Species List </p>
        </div>
    )
}

export default ListSpecies;