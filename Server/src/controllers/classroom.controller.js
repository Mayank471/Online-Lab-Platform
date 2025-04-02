import Assignment from "../models/Assignment.js" ;
import Classroom from "../models/Classroom.js" ;
import User from "../models/User.js" ;


export const createAssignment = async (req, res) => {
    try {
        const { assignmentName, description, dueDate, classroomId, testCases } = req.body;

        // Ensure required fields are provided
        if (!assignmentName || !dueDate || !classroomId || !testCases || Object.keys(testCases).length === 0 || description == "") {
            return res.status(400).json({ message: "Invalid input data or empty test cases" });
        }

        // Ensure classroom exists
        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }

        // Ensure due date is in the future
        if (new Date(dueDate) < new Date()) {
            return res.status(400).json({ message: "Due date must be in the future" });
        }

        // Ensure testCases is a valid object
        const testCasesObject = testCases && typeof testCases === "object" ? testCases : {};


        // Create the assignment
        const assignment = await Assignment.create({
            assignmentName,
            dueDate,
            classroomId,
            description,
            testCases: testCasesObject,
        });

        res.status(201).json({ assignment });

        // add this assignment to the reapective classroom
        await Classroom.findByIdAndUpdate(
            classroomId,
            { $push : {assignments: assignment._id}  } ,
        );
        
    } catch (error) {
        console.error("Error creating assignment:", error);
        res.status(500).json({ message: error.message });
    }
};



export const createClassroom = async (req, res) => {
    try {
        const { classroomName, instructorId , description, classroomCode} = req.body;

        // Ensure required fields are provided
        if (!classroomName || !instructorId || !description, !classroomCode) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        // Ensure instructor exists
        const instructor = await User.findById(instructorId);
        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }

        // Ensure classroomCode is unique
        const isCodeSame = await Classroom.findOne({classroomCode});
        if(isCodeSame){
            return res.status(400).json({message : " classroomCode is not unique choose something else"})
        }


        // Create the classroom
        const classroom = await Classroom.create({
            classroomName,
            description,
            instructorId,
            classroomCode,
        });

        //console.log("Classroom created:", classroom);
        res.status(201).json({ classroom });

        // Add classroom to instructors createdClassrooms list
        await User.findByIdAndUpdate(
            instructorId,
            {$push : { createdClassrooms : classroom._id}}
        )

    } catch (error) {
        console.error("Error creating classroom:", error);
        res.status(500).json({ message: error.message });
    }
};


export const addStudents = async (req, res) => {
    try {
        const { classroomId, studentIds } = req.body;

        // Ensure classroomId and studentIds are provided
        if (!classroomId || !Array.isArray(studentIds)) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        // Ensure classroom exists
        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }

        // Add students to enrolledStudents and avoid duplicates
        await Classroom.findByIdAndUpdate(
            classroomId,
            { $addToSet: { enrolledStudents: { $each: studentIds } } },
        );        
        

        res.status(201).json({ classroom });
    } catch (error) {
        console.error("Error adding students:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find()
            .populate('instructorId', 'name email')
            .select('classroomName description classroomCode enrolledStudents');
        res.status(200).json(classrooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
