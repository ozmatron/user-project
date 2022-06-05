import { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from '../../../../backend/src/types'
import './styles/user-detail.css'

const UserDetail = () => {

        const [user, setUser] = useState<User | null>(null);
        const [loading, setLoading] = useState(true);
        const [apiError, setApiError] = useState(false);
        const [noUserFound, setNoUserFound] = useState(false);
        const { id } = useParams();
        const navigate = useNavigate();

        useEffect(() => {
            let endpoint = "http://localhost:3333/users/" + id
            fetch(endpoint)
                .then((response) => response.json())
                .then((userData) => userData.user ? (setUser(userData.user), setLoading(false)) : 
                    userData.error.includes("No user found with id") ? 
                    (setNoUserFound(true),setLoading(false)) : navigate("/users"))
                .catch((err: { message: any; }) => {
                    setApiError(true)
                    setLoading(false)
                    console.log(err.message);
                });
           }, []);
        
          return <div className="user-detail">
            {!apiError && loading && 
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>}
            {!apiError && !loading && user &&
            <>
                <div className="user-detail__info"><b>Name:</b> {user.first_name} {user.last_name}</div>
                <div className="user-detail__info"><b>Email:</b> {user.email}</div>
                <div className="user-detail__info"><b>Gender:</b> {user.gender}</div>
                <div className="user-detail__info"><b>Company name:</b> {user.company.name}</div>
                <div className="user-detail__info"><b>Company department:</b> {user.company.department}</div>
            </>
            }
            {apiError &&
                <div>Error loading user</div>}
            {noUserFound &&
                <div>User Not Found</div>}
          </div>
}

export default UserDetail;

