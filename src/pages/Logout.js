import { Navigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import UserContext from "../UserContext";

export default function Logout(){

	const { unsetUser, setUser } = useContext(UserContext);

	unsetUser();

	useEffect(() =>{

		setUser({
			id: null,
			isAdmin: null,
            email: null,
            userType: null,
            firstName: null,
            middleName: null,
            lastName: null
		});
	});
	
	return(
		<Navigate to="/" />
	)
}
