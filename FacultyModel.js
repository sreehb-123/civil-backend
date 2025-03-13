import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema({
    name: { type: String,},
    role: { type: String,},
    address: { type: String,},
    researchInterests: { type: [String],},
    educationAndExperience: [
        {
            role: { type: String },
            duration: { type: String,},
            description: { type: String,}
        }
    ],
    researchTeam: [
        {
            name: { type: String },
            education: [
                {
                    degree: { type: String },
                    duration: { type: String },
                    college: { type: String }
                }
            ],
            email: { type: String },
            linkedinUrl: { type: String }
        }
    ],
    publications: [
        {
            types: { type: String },
            subTypes: [
                {
                    heading: { type: String },
                    list: [
                        {
                            author: { type: String},
                            title: { type: String},
                            name: { type: String}
                        }
                    ]
                }
            ]
        }
    ],
    professionalActivities: [
        {
            headings: { type: String },
            activities: [{ type: String }]
        }
    ],
    teaching: { type: [String],},
    projects: [
        {
            projectType: { type: String },
            listOfProjects: [{ type: String }]
        }
    ],
    awards: { type: [String], },
    linkedin: { type: String, },
    researchGate: { type: String, },
    googleScholar: { type: String, },
    publicationsArray : { type: [String] }
}, { collection: 'faculty' });

const Faculty = mongoose.model('Faculty', FacultySchema);
export default Faculty;
