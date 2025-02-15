
/********************************************************************************
* WEB700 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Viraj Parekh Student ID: ____________ Date: ____________
*
* Published URL: ___________________________________________________________
*
********************************************************************************/

const express = require("express");
const path = require("path");
const LegoData = require("./modules/legoSets");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const legoData = new LegoData();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views/about.html"));
});

app.get("/lego/sets", async (req, res) => {
    try {
        let sets;
        if (req.query.theme) {
            sets = await legoData.getSetsByTheme(req.query.theme);
        } else {
            sets = await legoData.getAllSets();
        }
        res.json(sets);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

app.get("/lego/sets/:set_num", async (req, res) => {
    try {
        const set = await legoData.getSetByNum(req.params.set_num);
        res.json(set);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views/404.html"));
});

legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`Server running on port ${HTTP_PORT}`);
    });
}).catch(err => {
    console.error(`Failed to initialize: ${err}`);
});
