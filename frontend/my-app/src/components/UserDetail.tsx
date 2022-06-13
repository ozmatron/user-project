import { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMachine } from '@xstate/react';
import { stateMachine } from "../state/UserDetailState";
import './styles/user-detail.css'

const UserDetail = () => {

        const [apiError, setApiError] = useState(false);
        const { id } = useParams();
        const navigate = useNavigate();
        const [state, send] = useMachine(stateMachine);

        useEffect(() => {
            let endpoint = "http://localhost:3333/users/" + id
            fetch(endpoint)
                .then((response) => response.json())
                .then((userData) => userData.user ? 
                    (send({type: 'UPDATE_LOADING', data: !state.context.loading}), 
                    send({type: 'UPDATE_USER', data: userData.user})) : 
                      userData.error.includes("No user found with id") ? 
                      (send({type: 'UPDATE_NO_USER', data: userData.error}),send({type: 'UPDATE_LOADING', data: !state.context.loading})) : 
                      navigate("/users"))
                .catch((err: { message: any; }) => {
                    setApiError(true)
                    send({type: 'UPDATE_LOADING', data: !state.context.loading})
                    console.log(err.message);
                });
           }, []);
        
          return <div className="user-detail">
            {!apiError && state.context.loading && 
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>}
            {!apiError && !state.context.loading && state.context.user &&
            <>
                <div className="user-detail__info"><b>Name:</b> {state.context.user.first_name} {state.context.user.last_name}</div>
                <div className="user-detail__info"><b>Email:</b> {state.context.user.email}</div>
                <div className="user-detail__info"><b>Gender:</b> {state.context.user.gender}</div>
                <div className="user-detail__info"><b>Company name:</b> {state.context.user.company.name}</div>
                <div className="user-detail__info"><b>Company department:</b> {state.context.user.company.department}</div>
            </>
            }
            {apiError &&
                <div>Error loading user</div>}
            {state.context.noUserFound &&
                <div>{state.context.noUserFound}</div>}
          </div>
}

export default UserDetail;

