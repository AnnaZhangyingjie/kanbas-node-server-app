import Database from "../Database/index.js";
function AssignmentsRoutes(app) {
    app.get("/api/assignments", (req, res) => {
        const assignments = Database.assignments;
        res.send(assignments);
    });

    app.get("/api/assignments/:courseId", (req, res) => {
        const { courseId } = req.params;
        const assignments = Database.assignments.filter((c) => c.course === courseId);

        if (assignments.length === 0) {
            res.status(404).send("No Assignments under this course found");
            return;
        }
        res.send(assignments);
    });

    app.get("/api/assignments/:courseId/:assignmentId", (req, res) => {
        const { courseId, assignmentId } = req.params;

        const assignment = Database.assignments.find(assignment =>
            assignment.course === courseId && assignment._id === assignmentId
        );

        if (!assignment) {
            return res.status(404).send("Assignment not found");
        }

        res.json(assignment);
    });

    app.delete("/api/assignments/:courseId/:assignmentId", (req, res) => {
        const{assignmentId} = req.params;
        // console.log(req.params )
        Database.assignments = Database.assignments
            .filter((c) => {
                // console.log("c._id is " + c._id.$oid);
                // console.log("id is " + id);
                // console.log("c._id === id is " + c._id === id);
                return c._id !== assignmentId
            });
        res.sendStatus(204);
    });

    app.post("/api/assignments/:courseId", (req, res) => {
        const { courseId } = req.params;
        const newAssignment = req.body;

        newAssignment.course = courseId;

        const courseAssignments = Database.assignments.filter(a => a.course === courseId);
        const maxId = courseAssignments.reduce((max, item) => {
            const idNum = parseInt(item._id.substring(1));
            return idNum > max ? idNum : max;
        }, 100);

        const nextId = maxId + 1;

        // Format new ID
        newAssignment._id = 'A' + nextId.toString().padStart(3, '0');

        Database.assignments.push(newAssignment);
        res.status(201).json(newAssignment);
    });

    app.put("/api/assignments/:courseId/:assignmentId", (req, res) => {
        const { courseId, assignmentId } = req.params;
        const updatedData = req.body;

        const assignmentIndex = Database.assignments.findIndex(assignment =>
            assignment.course === courseId && assignment._id === assignmentId
        );

        if (assignmentIndex === -1) {
            return res.status(404).send("Assignment not found");
        }

        Database.assignments[assignmentIndex] = {
            ...Database.assignments[assignmentIndex],
            ...updatedData
        };

        res.json(Database.assignments[assignmentIndex]);
    });


//     app.post("/api/courses", (req, res) => {
//         const course = {...req.body,
//             _id:{
//                 $oid: new Date().getTime().toString()
//             }};
//         Database.courses.push(course);
//         res.send(course);
//     });
//
//     app.delete("/api/courses/:id", (req, res) => {
//         const{id} = req.params;
//         // console.log(req.params )
//         Database.courses = Database.courses
//             .filter((c) => {
//                 // console.log("c._id is " + c._id.$oid);
//                 // console.log("id is " + id);
//                 // console.log("c._id === id is " + c._id === id);
//                 return c._id.$oid !== id
//             });
//         res.sendStatus(204);
//     });
//
//     app.put("/api/courses/:id", (req, res) => {
//         const{id} = req.params;
//         const course = req.body;
//         Database.courses = Database.courses.map(
//             (c) => c._id.$oid === course._id.$oid? course : c
//         );
//         res.sendStatus(204);
//     });
//

//
}
export default AssignmentsRoutes;