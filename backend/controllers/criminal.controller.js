import Criminal from '../models/criminal.model.js';

const createCriminal = async (req, res) => {
    try {
        const { name, age, crime, sentence, jailLocation, dateOfArrest } = req.body;

        if (!name || !age || !crime || !sentence || !jailLocation) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newCriminal = new Criminal({
            name,
            age,
            crime,
            sentence,
            jailLocation,
            dateOfArrest
        });

        await newCriminal.save();
        res.status(201).json({ message: "Criminal created successfully", criminal: newCriminal });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error creating criminal" });
    }
};

const getCriminals = async (req, res) => {
    try {
        const criminals = await Criminal.find();
        res.status(200).json(criminals);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error fetching criminals" });
    }
};

const deleteCriminals = async (req, res) => {
    try {
        const { id } = req.params;
        const criminal = await Criminal.findByIdAndDelete(id);

        if (!criminal) {
            return res.status(404).json({ message: "Criminal not found" });
        }
        res.status(200).json({ message: "Criminal deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error deleting criminal" });
    }
};

const updateCriminals = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCriminal = await Criminal.findByIdAndUpdate(id, req.body, { new: true }); // {new: true} returns the updated document

        if (!updatedCriminal) {
            return res.status(404).json({ message: "Criminal not found" });
        }
        res.status(200).json({ message: "Criminal updated successfully", criminal: updatedCriminal });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error updating criminal" });
    }
};

export { createCriminal, getCriminals, deleteCriminals, updateCriminals };