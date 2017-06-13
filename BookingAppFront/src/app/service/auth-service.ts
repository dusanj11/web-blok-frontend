import { CurrentUser } from "app/model/current-user";

export class AuthService {
    
    loggedIn : boolean;

    constructor(){
        
    }

    logIn(currentUser: CurrentUser): void{
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    logOut(): void{
        sessionStorage.removeItem("currentUser");
    }

    isLoggedIn(): boolean{
        if(sessionStorage.getItem("currentUser") !== null)
            return true;
        else
            return false;
    }

    isLoggedOut(): boolean{
        if(sessionStorage.getItem("currentUser") !== null)
            return false;
        else
            return true;
    }

    isLoggedInRole(role: string): boolean {
        let curretUser = sessionStorage.getItem("currentUser");
        if ( curretUser !== null){
            let user: CurrentUser = JSON.parse(curretUser);
            if (user.role == role){
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    currentUserId(): number {
        let curretUser = sessionStorage.getItem("currentUser");
        if ( curretUser !== null){
            let user: CurrentUser = JSON.parse(curretUser);
            return user.id;
        }
        else
        {
            return -1;
        }
    }

    
}
