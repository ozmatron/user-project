import { useMachine } from "@xstate/react";
import { useEffect, useState} from "react";
import { stateMachine } from "../state/UserListState";
import './styles/user-table.css'

const UserTable = () => {

        const [apiError, setApiError] = useState(false);
        const [state, send] = useMachine(stateMachine);

        useEffect(() => {
            fetch(`http://localhost:3333/users`)
                .then((response) => response.json())
                .then((userData) => (send({type: 'UPDATE_USER_LIST', data: userData.users}), 
                    send({type: 'UPDATE_LOADING', data: !state.context.loading})))
                .catch((err: { message: any; }) => {
                    setApiError(true)
                    send({type: 'UPDATE_LOADING', data: !state.context.loading})
                    console.log(err.message);
                });
           }, []);

           console.log("yurt", state.context)
        
          return <div className="user-list">
            {!apiError && state.context.loading && 
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>}
            {!apiError && !state.context.loading && state.context.userList && state.context.userList?.length > 0 && state.context.userList.map(user => 
            <>
                <div className="user-list__name" key={user.id}><b>User name:</b> {user.first_name} {user.last_name}</div>
            </>
            )}
            {apiError &&
            <div>Error loading users</div>}
          </div>
}

export default UserTable;
