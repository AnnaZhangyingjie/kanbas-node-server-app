import Database from "../Database/index.js";

function ModuleRoutes(app) {
    app.get("/api/courses/:cid/modules", (req, res) => {
        const{cid} = req.params;
        const modules = Database.modules.
        filter((m) => m.course === cid);
        res.send(modules);
    });

    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const module = {...req.body, course: cid};

        const courseModules = Database.modules.filter((m) => m.course === cid);

        const idNumbers = courseModules.map(m => {
            const match = m._id.match(/\d+$/);
            return match ? parseInt(match[0]) : 0;
        });

        const highestIdNumber = Math.max(...idNumbers, 0);

        const newIdNumber = highestIdNumber + 1;
        const newId = `M${newIdNumber.toString().padStart(3, '0')}`;


        const newModule = {...module, _id: newId};

        Database.modules.push(newModule);

        res.send(newModule);
    });

    app.delete("/api/modules/:mid", (req, res) => {

        const { mid } = req.params;

        Database.modules = Database.modules.filter((m) => m._id !== mid);
        res.sendStatus(200);
    });

    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        console.log(mid);
        const moduleIndex = Database.modules.findIndex(
            (m) => m._id === mid);

        if (moduleIndex === -1) {
            return res.status(404).send('Module not found');
        }

        Database.modules[moduleIndex] = {
            ...Database.modules[moduleIndex],
            ...req.body
        };
        res.sendStatus(204);
    });


}
export default ModuleRoutes;