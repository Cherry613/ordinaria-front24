import { FunctionComponent } from "preact";
import { Logout } from "../islands/Logout.tsx";


export const Menu: FunctionComponent<{username: string}> = ({username}) => {
    //logout es una isla -> deja la cookie en blanco + vuelve al login
    return(
        <div class="header-content">
            <span class="user-name">{username}</span>
            <Logout />
        </div>
    )
}