"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_json_1 = __importDefault(require("./users.json"));
const cors_1 = __importDefault(require("cors"));
const routes = (0, express_1.Router)();
routes.use((0, cors_1.default)());
routes.get('/users', (req, res) => {
    var users = [];
    users_json_1.default.forEach((user) => {
        users.push({
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name
        });
    });
    if (users.length > 0) {
        return res.json({ users });
    }
    else {
        return res.json({ error: "Could not find any users" });
    }
});
routes.get('/users/:id', (req, res) => {
    var params = parseInt(req.params.id);
    var user;
    if (!isNaN(params)) {
        let foundUser = users_json_1.default.find(user => user.id === params);
        if (foundUser) {
            user = {
                "id": (foundUser === null || foundUser === void 0 ? void 0 : foundUser.id) ? foundUser.id : null,
                "first_name": (foundUser === null || foundUser === void 0 ? void 0 : foundUser.first_name) ? foundUser.first_name : null,
                "last_name": (foundUser === null || foundUser === void 0 ? void 0 : foundUser.last_name) ? foundUser.last_name : null,
                "email": (foundUser === null || foundUser === void 0 ? void 0 : foundUser.email) ? foundUser.email : null,
                "gender": (foundUser === null || foundUser === void 0 ? void 0 : foundUser.gender) ? foundUser.gender : null,
                "company": {
                    "name": (foundUser === null || foundUser === void 0 ? void 0 : foundUser.company.name) ? foundUser.company.name : null,
                    "department": (foundUser === null || foundUser === void 0 ? void 0 : foundUser.company.department) ? foundUser.company.department : null
                }
            };
            return res.json({ user });
        }
        else {
            return res.json({ error: "No user found with id " + params });
        }
    }
    else {
        return res.json({ error: "Invalid id" });
    }
});
exports.default = routes;
