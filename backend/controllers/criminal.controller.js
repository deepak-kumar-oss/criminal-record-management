import Criminal from '../models/criminal.model.js';

const createCriminal = (req, res) => {
    try{
        const {name , age , crime , sentence , jailLocation , dateOfArrest} = req.body;

    if(!name || !age || !crime || !sentence || !jailLocation){
        return res.status(400).json({message: "All fields are required"});
    }

    const criminal = new Criminal({
        name,
        age,
        crime,
        sentence,
        jailLocation,
        dateOfArrest
    });

    // Save to database
    criminal.save()
        .then(() => {
            res.status(201).json({ message: "Criminal created successfully" });
        })
        .catch((err) => {
            console.error(err.message);
            res.status(500).json({ message: "Error creating criminal" });
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send("error occur in  criminal.controller.js in  createCriminal");
    }

}

const getCriminals = (req, res) => {
    try{
        Criminal.find()
        .then((criminals) => {
            res.json(criminals);
        })
        .catch((err) => {
            console.error(err.message);
            res.status(500).json({ message: "Error fetching criminals" });
        });
    
    }catch(err){
        console.error(err.message);
        console.log("error occur in  criminal.controller.js in  getCriminals");
    }
}

const deleteCriminals = (req, res) => {
    try{
        const {id} = req.params;
        Criminal.findByIdAndDelete(id)
            .then(() => {
                res.json({ message: "Criminal deleted successfully" });
            })
            .catch((err) => {
                console.error(err.message);
                res.status(500).json({ message: "Error deleting criminal" });
            });
    }catch(err){
        console.error(err.message);
        console.log("error occur in  criminal.controller.js in  deleteCriminals");
    }
}

const updateCriminals = (req, res) => {
    try{
        const {id} = req.params;
        const {name , age , crime , sentence , jailLocation , dateOfArrest} = req.body;
        Criminal.findByIdAndUpdate(id, {
            name,
            age,
            crime,
            sentence,
            jailLocation,
            dateOfArrest
        })
        .then(() => {
            res.json({ message: "Criminal updated successfully" });
        })
        .catch((err) => {
            console.error(err.message);
            res.status(500).json({ message: "Error updating criminal" });
        });
    }catch(err){
        console.error(err.message);
        console.log("error occur in  criminal.controller.js in  updateCriminals");
    }
}

export {createCriminal , getCriminals , deleteCriminals , updateCriminals}