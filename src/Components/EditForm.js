import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function EditForm({ type, name, data, event }) {
    const { deckId } = useParams();
    const history = useHistory();

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        function setExistingData() {
            setFormData({
                ...data
            });
        }
        setExistingData();
    }, [data])

    const handleFormChange = ({ currentTarget }) => {
        console.log(formData);
        setFormData({
            ...formData,
            [currentTarget.name]: currentTarget.value 
        });
    }
    
    return (
        <>
        {type === "Deck" ? (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/"><span className="oi oi-home"></span> Home</a></li>
                    <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{name}</a></li>
                    <li className="breadcrumb-item text-secondary">Edit Deck</li>
                </ol>
            </nav>
            <h2>Edit Deck</h2>
        </>
        ) : (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/"><span className="oi oi-home"></span> Home</a></li>
                    <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{name}</a></li>
                    <li className="breadcrumb-item text-secondary">Edit Card {data.id}</li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
        </>
        )}
        <form onSubmit={() => event(formData)}>
            <div className="form-group">
                <label htmlFor="fieldOne">{type === "Deck" ? "Name" : "Front"}</label>
                <textarea className="form-control" id="fieldOne" name={type === "Deck" ? "name" : "front"} defaultValue={data.name || data.front} onChange={handleFormChange} required={true} />
            </div>
            <div className="form-group">
                <label htmlFor="fieldTwo">{type === "Deck" ? "Description" : "Back"}</label>
                <textarea className="form-control" id="fieldTwo" name={type === "Deck" ? "description" : "back"} defaultValue={data.description || data.back} onChange={handleFormChange} required={true} />
            </div>
            <button className="btn btn-secondary mr-1" onClick={() => history.push('/')}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
    );
}

export default EditForm;