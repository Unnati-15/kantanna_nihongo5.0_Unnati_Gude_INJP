import { useState, useEffect } from 'react';
import axios from 'axios';

const FlashCard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [fcName, setFcName] = useState('');
    const [fcDescription, setFcDescription] = useState('');
    const [editFcId, setEditFcId] = useState(null);

    // Fetch Flashcards from API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/flashcard/')
            .then(response => setFlashcards(response.data))
            .catch(error => console.error('Error fetching flashcards:', error));
    }, []);

    // Handle Submit (for adding or updating)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = { fc_name: fcName, fc_description: fcDescription };
        
        if (editFcId) {
            // Update existing flashcard
            axios.put(`http://127.0.0.1:8000/flashcard/${editFcId}/`, data)
                .then(response => {
                    setFlashcards(flashcards.map(fc => fc.id === editFcId ? response.data : fc));
                    setFcName('');
                    setFcDescription('');
                    setEditFcId(null);
                })
                .catch(error => console.error('Error updating flashcard:', error));
        } else {
            // Create new flashcard
            axios.post('http://127.0.0.1:8000/flashcard/', data)
                .then(response => {
                    setFlashcards([...flashcards, response.data]);
                    setFcName('');
                    setFcDescription('');
                })
                .catch(error => console.error('Error adding flashcard:', error));
        }
    };

    // Handle Delete
    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/flashcard/${id}/`)
            .then(() => {
                setFlashcards(flashcards.filter(fc => fc.id !== id));
            })
            .catch(error => console.error('Error deleting flashcard:', error));
    };

    // Handle Edit
    const handleEdit = (fc) => {
        setFcName(fc.fc_name);
        setFcDescription(fc.fc_description);
        setEditFcId(fc.id);
    };

    return (
        <div className="p-5 space-y-5">
            <h2 className="text-2xl font-semibold">Flashcards</h2>

            {/* Add/Edit Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label">
                        <span className="label-text">Flashcard Name</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={fcName}
                        onChange={(e) => setFcName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Flashcard Description</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        value={fcDescription}
                        onChange={(e) => setFcDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editFcId ? 'Update Flashcard' : 'Add Flashcard'}
                </button>
            </form>

            {/* Flashcard Table */}
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Flashcard Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {flashcards.map((fc, index) => (
                        <tr key={fc.id}>
                            <td>{index + 1}</td>
                            <td>{fc.fc_name}</td>
                            <td>{fc.fc_description}</td>
                            <td>
                                <button
                                    className="btn btn-warning m-2"
                                    onClick={() => handleEdit(fc)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-error m-2"
                                    onClick={() => handleDelete(fc.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FlashCard;
