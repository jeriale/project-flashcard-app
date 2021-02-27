import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Form({ data, event }) {
    const history = useHistory();

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
                <label htmlFor="fieldOne">{data.name ? "Name" : "Front"}</label>
                <textarea className="form-control" id="fieldOne" name={data.name ? "name" : "front"} defaultValue={data.name || data.front} onChange={handleFormChange} required={true} />
            </div>
            <div className="form-group">
                <label htmlFor="fieldTwo">{data.description ? "Description" : "Back"}</label>
                <textarea className="form-control" id="fieldTwo" name={data.description ? "description" : "back"} defaultValue={data.description || data.back} onChange={handleFormChange} required={true} />
            </div>
            <button className="btn btn-secondary mr-1" onClick={() => history.push('/')}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default Form;