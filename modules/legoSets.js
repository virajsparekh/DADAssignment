/********************************************************************************
*  WEB700 – Assignment 03
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Viraj Sarjubhai Parekh Student ID: 119204238 Date: 14/02/2025
********************************************************************************/

const fs = require("fs").promises;

class LegoData {
    constructor() {
        this.sets = [];
    }

    // Load data from JSON files and process it
    async initialize() {

        const setData = require('../data/setData.json')
        const themeData = require('../data/themeData.json')

        this.sets = setData.map(element => {
            element.theme = themeData.find((ele) => ele.id == element.theme_id).name
            return {...element}
        });
    }

    // Return all sets
    getAllSets() {
        return this.sets.length > 0
            ? Promise.resolve(this.sets)
            : Promise.reject(new Error("No sets available."));
    }

    // Find specific set by its number
    getSetByNum(setNum) {
        const set = this.sets.find(s => s.set_num === setNum);
        return set
            ? Promise.resolve(set)
            : Promise.reject(new Error(`Set with number ${setNum} not found.`));
    }

    // Find sets matching a theme
    getSetsByTheme(theme) {
        const filteredSets = this.sets.filter(s => s.theme.toLowerCase().includes(theme.toLowerCase()));
        return filteredSets.length > 0
            ? Promise.resolve(filteredSets)
            : Promise.reject(new Error(`No sets found with theme containing '${theme}'.`));
    }
}
module.exports = LegoData;
