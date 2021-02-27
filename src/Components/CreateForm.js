import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CreateForm({ type, event }) {
    const history = useHistory();

    const placeholderOne = type === "deck" ? "Deck name" : "Question";
    const placeholderTwo = type === "deck" ? "Brief description of the deck" : "Answer";

    const [formData, setFormData] = useState(null);

    const handleFormChange = ({ currentTarget }) => {
        console.log(formData);
        setFormData({
            ...formData,
            [currentTarget.name]: currentTarget.value 
        });
    }
    
    return (
        <form onSubmit={() => event(formData)}>
            <div className="form-group">
                <label htmlFor="fieldOne">{type === "deck" ? "Name" : "Front"}</label>
                <textarea className="form-control" id="fieldOne" name={type === "deck" ? "name" : "front"} placeholder={placeholderOne} onChange={handleFormChange} required={true} />
            </div>
            <div className="form-group">
                <label htmlFor="fieldTwo">{type === "deck" ? "Description" : "Back"}</label>
                <textarea className="form-control" id="fieldTwo" name={type === "deck" ? "description" : "back"} placeholder={placeholderTwo} onChange={handleFormChange} required={true} />
            </div>
            <button className="btn btn-secondary mr-1" onClick={() => history.push('/')}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default CreateForm;