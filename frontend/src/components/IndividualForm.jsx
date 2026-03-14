import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import './IndividualForm.css'

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
            <h2>Add Individual Animal Form</h2>
            <Form.Group>
                <Form.Label>Species: </Form.Label>
                <input
                    id="species-input-readonly"
                    type="text"
                    required
                    value={speciesName}
                    readOnly={true}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Given Nick Name: </Form.Label>
                <input
                    type="text"
                    id="nick-name-input"
                    placeholder="Cutie pie"
                    required
                    value={individual.nick_name}
                    onChange={handleNickname}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Your Name: </Form.Label>
                <input
                    type="text"
                    id="scientist-name-input"
                    placeholder="Dari Cares"
                    required
                    value={individual.scientist_tracking}
                    onChange={handleScientistTracking}
                />
            </Form.Group>
            <Form.Group>
                <Button type="submit" variant="outline-sucess">
                    Submit
                </Button>
                <Button type="button" variant="outline=warning" onClick={clearForm}>
                    Reset
                </Button>
                <Button type="button" variant="outline=warning" onClick={goBack}>
                    Back
                </Button>
            </Form.Group>
        </Form>
    )

}

export default IndividualForm; 

