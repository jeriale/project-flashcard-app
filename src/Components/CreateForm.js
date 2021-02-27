import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function CreateForm({ type, name, event }) {
    const history = useHistory();
    const { deckId } = useParams();

    const placeholderOne = type === "Deck" ? "Deck name" : "Question";
    const placeholderTwo = type === "Deck" ? "Brief description of the deck" : "Answer";

    const [formData, setFormData] = useState(null);

    const handleFormChange = ({ currentTarget }) => {
        console.log(formData);
        setFormData({
            ...formData,
            [currentTarget.name]: currentTarget.value 
        });
    }
    
    return (
        <>
            {type === "Card" ? (
                <>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/"><span className="oi oi-home"></span> Home</a></li>
                            <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{name}</a></li>
                            <li className="breadcrumb-item text-secondary">Add Card</li>
                        </ol>
                    </nav>
                    <h2>{name}: Add Card</h2>
                </>
            ) : (
                <>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/"><span className="oi oi-home"></span> Home</a></li>
                            <li className="breadcrumb-item text-secondary">Create Deck</li>
                        </ol>
                    </nav>
                    <h2>Create Deck</h2>
                </>
            )}
            <form onSubmit={() => event(formData)}>
                <div className="form-group">
                    <label htmlFor="fieldOne">{type === "Deck" ? "Name" : "Front"}</label>
                    <textarea className="form-control" id="fieldOne" name={type === "Deck" ? "name" : "front"} placeholder={placeholderOne} onChange={handleFormChange} required={true} />
                </div>
                <div className="form-group">
                    <label htmlFor="fieldTwo">{type === "Deck" ? "Description" : "Back"}</label>
                    <textarea className="form-control" id="fieldTwo" name={type === "Deck" ? "description" : "back"} placeholder={placeholderTwo} onChange={handleFormChange} required={true} />
                </div>
                <button className="btn btn-secondary mr-1" onClick={() => history.push('/')}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default CreateForm;