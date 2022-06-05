import { useEffect, useState} from "react";
import { UserList } from '../../../../backend/src/types'
import './styles/user-table.css'

const UserTable = () => {

        const [users, setUsers] = useState<UserList[] | null>(null);
        const [loading, setLoading] = useState(true);
        const [apiError, setApiError] = useState(false);

        useEffect(() => {
            fetch(`http://localhost:3333/users`)
                .then((response) => response.json())
                .then((userData) => (setUsers(userData.users), setLoading(false)))
                .catch((err: { message: any; }) => {
                    setApiError(true)
                    setLoading(false)
                    console.log(err.message);
                });
           }, []);
        
          return <div className="user-list">
            {!apiError && loading && 
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>}
            {!apiError && !loading && users && users?.length > 0 && users.map(user => 
            <>
                <div className="user-list__name" key={user.id}><b>User name:</b> {user.first_name} {user.last_name}</div>
            </>
            )}
            {apiError &&
            <div>Error loading users</div>}
          </div>
}

export default UserTable;
