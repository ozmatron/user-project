import { Router } from 'express';
import usersData from './users.json';
import { UserList, User } from './types'
import cors from 'cors'

const routes = Router();

routes.use(cors());

routes.get('/users', (req, res) => {
    var users: UserList[] = []
    usersData.forEach( (user) => {
        users.push({
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name
        })
    });
    if(users.length > 0) {
        return res.json({ users });
    } else {
        return res.json({ error: "Could not find any users" });
    }
});

routes.get('/users/:id', (req, res) => {
    var params: number = parseInt(req.params.id)
    var user: User
    if (!isNaN(params)) {
        let foundUser = usersData.find(user => user.id === params);
        if (foundUser) {
            user = {
                "id": foundUser?.id ? foundUser.id : null,
                "first_name": foundUser?.first_name ? foundUser.first_name : null,
                "last_name": foundUser?.last_name ? foundUser.last_name : null,
                "email" : foundUser?.email ? foundUser.email : null,
                "gender": foundUser?.gender ? foundUser.gender : null,
                "company": {
                    "name": foundUser?.company.name ? foundUser.company.name : null,
                    "department": foundUser?.company.department ? foundUser.company.department : null
                }
            }
            return res.json({ user });
        } else {
            return res.json({ error: "No user found with id " + params });
        }
    } else {
        return res.json({ error: "Invalid id" });
    }
});

export default routes;