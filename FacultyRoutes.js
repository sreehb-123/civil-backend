import express from 'express';
import Faculty from './FacultyModel.js';

const router = express.Router();

router.get('/faculties', async (req, res) => {
    try {
        const faculties = await Faculty.find({}, 'name role image');
        if (!faculties || faculties.length === 0) {
            return res.status(404).json({ message: 'No faculties found' });
        }
        res.status(200).json(faculties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching faculty data', error });
    }
});

router.get('/faculty/:id', async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }
        res.status(200).json(faculty);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching faculty details', error });
    }
});

router.get('/edu-exp/:id', async(req,res) => {
    try {
        const data = await Faculty.findById(req.params.id, 'educationAndExperience');
        if (!data) {
            return res.status(404).json({ message: 'Faculty not found' });
        }
        res.status(200).json(data.educationAndExperience);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching faculty details', error });
    }
});

export default router;