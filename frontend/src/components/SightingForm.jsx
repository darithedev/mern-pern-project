import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import dateFormat from '../helpers/dateFormat';
import './SightingForm.css'

const SightingForm = ({ setScreen, speciesId, filteredIndivs }) => {
    
    const [sightings, setSightings] = useState({
        sighting: "",
        individual_id: speciesId,
        location: "",
        healthy: true,
        sighted_by_email: ""
    });

    const handleSightingDate = (event) => {
        const sighting = event.target.value;
        setSightings((dt) => ({ ...dt, sighting }));
    };

    const onChangeIndividuals = (event) => {
        const individual_id = event.target.value;
        setSightings((individualsID) => ({ ...individualsID, individual_id }));
    }

    const handleLocation = (event) => {
        const location = event.target.value;
        setSightings((l) => ({ ...l, location}));
    };

    const handleHealthy = (event) => {
        let healthy;
        if (event.target.value === 'true') {
            healthy = true;
        } else healthy = false;
        setSightings((h) => ({ ...h, healthy}));
    };

    const handleEmail = (event) => {
        const sighted_by_email = event.target.value;
        setSightings((e) => ({ ...e, sighted_by_email}));
    };

    const clearForm = () => {
        setSightings({ 
            sighting: "",
            individual_id: speciesId,
            location: "",
            healthy: true,
            sighted_by_email: "" 
        });
    };

    const goBack = () => {
        setScreen("individuals");
    }

    const postSighting = (newSighting) => {
        return fetch("http://localhost:8080/api/sightings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSighting)
        })
        .then((response) => {
            return response.json();
        })
        .then(() => {
            clearForm();
            goBack();
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        postSighting(sightings);
    }

    return (
        <Form 
            className="form-sightings"
            onSubmit={handleSubmit}
        >
            <h2>Add Sighting of an Individual Animal Form</h2>
            <Form.Group>
                <Form.Label>Sighting: </Form.Label>
                <input
                    type="datetime-local"
                    id="sighting-date"
                    required
                    value={dateFormat(sightings.sighting)}
                    onChange={handleSightingDate}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Individuals: </Form.Label>
                <select
                    id="dropdown"
                    value={sightings.individual_id}
                    onChange={onChangeIndividuals}
                >
                    {filteredIndivs.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.nick_name}
                        </option>
                    ))}
                </select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Location of individual: </Form.Label>
                <input
                    type="text"
                    id="location-input"
                    placeholder="Savanna"
                    required
                    value={sightings.location}
                    onChange={handleLocation}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Health At Time of Sighting: </Form.Label>
                <select
                    id="dropdown"
                    required
                    value={sightings.healthy}
                    onChange={handleHealthy}
                >
                    <option value="true">Healthy</option>
                    <option value="false">Not Healthy</option>
                </select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Your Email: </Form.Label>
                <input
                    type="text"
                    id="scientist-email-input"
                    placeholder="Jolly.Bolly@example.yay"
                    required
                    value={sightings.sighted_by_email}
                    onChange={handleEmail}
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

export default SightingForm; 

