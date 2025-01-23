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

router.put('/update', async (req, res) => {
    const { id, field, editedData } = req.body;

    try {
        // Fetch the faculty document
        const faculty = await Faculty.findById(id);

        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        // Update the specific field
        faculty[field] = editedData;

        // Save the document back to the database
        await faculty.save();

        res.status(200).json({ message: `${field} updated successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/api/facultyId', async (req, res) => {
    const { token } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const email = decodedToken.email;

        const faculty = await Faculty.findOne({ email });

        if (faculty) {
            res.json({
                success: true,
                facultyId: faculty._id,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No faculty found associated with this email',
            });
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({
            success: false,
            message: 'Invalid token',
        });
    }
});

export default router;