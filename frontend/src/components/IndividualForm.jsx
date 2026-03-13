import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const IndividualForm = ({ setScreen, speciesId, speciesName, fetchIndividuals }) => {
    
    const [individual, setIndividual] = useState({
        nick_name: "",
        scientist_tracking: "",
        species_id: speciesId,
    });

    const handleNickname = (event) => {
        const nick_name = event.target.value;
        setIndividual((nickName) => ({ ...nickName, nick_name }));
    };

    const handleScientistTracking = (event) => {
        const scientist_tracking = event.target.value;
        setIndividual((scientistName) => ({ ...scientistName, scientist_tracking}));
    };

    const clearForm = () => {
        setIndividual({ nick_name: "", scientist_tracking: "", species_id: speciesId });
    }

    const goBack = () => {
        setScreen("individuals");
    }

    const postIndividual = (newIndividual) => {
        return fetch("http://localhost:8080/api/individuals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newIndividual)
        })
        .then((response) => {
            return response.json();
        })
        .then(() => {
            clearForm();
            fetchIndividuals();
            goBack();
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postIndividual(individual);
        setScreen("individuals");
    }

    return (
        <Form 
            className="form-individual"
            onSubmit={handleSubmit}
        >
            
        </Form>
    )

}

export default IndividualForm; 

