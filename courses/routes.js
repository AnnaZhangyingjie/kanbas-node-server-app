import Database from "../Database/index.js";
function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });

    app.post("/api/courses", (req, res) => {
        const course = {...req.body,
            _id:{
            $oid: new Date().getTime().toString()
            }};
        Database.courses.push(course);
        res.send(course);
    });

    app.delete("/api/courses/:id", (req, res) => {
        const{id} = req.params;
        // console.log(req.params )
        Database.courses = Database.courses
            .filter((c) => {
                // console.log("c._id is " + c._id.$oid);
                // console.log("id is " + id);
                // console.log("c._id === id is " + c._id === id);
                return c._id.$oid !== id
            });
        res.sendStatus(204);
        });

    app.put("/api/courses/:id", (req, res) => {
        const{id} = req.params;
        const course = req.body;
        Database.courses = Database.courses.map(
            (c) => c._id.$oid === course._id.$oid? course : c
        );
        res.sendStatus(204);
    });

    app.get("/api/courses/:id", (req, res) => {
        const{id} = req.params;
        console.log(id);
        const course = Database.courses.find((c) => {
            return c._id.$oid === id
        });
        if (!course) {
            res.status(404).send("Course not found");
            return;
        }
        res.send(course);
    })

}
export default CourseRoutes;