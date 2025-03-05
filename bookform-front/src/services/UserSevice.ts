import axios from "axios";
import type { User } from "../interfaces/User";
import { UserModel } from "../classes/UserModel";

const apiUrl = import.meta.env.VITE_API_URL;

export function actualUser() {
    if(localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem('user')!);
    }
}

export function getUserToken() {
    const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')?.replace(/['"]+/g, '') : null

    // if (!token) {
    //     location.href = "/login";
    //     throw new Error('No se ha iniciado sesión.')
    // }
    
    return token;
}

// export function logout() {
//     console.log('Cerrando sesión...');
//     localStorage.removeItem('userLogged');
//     localStorage.removeItem('user');
//     localStorage.removeItem('accessToken');
//     location.href = "/login";
// }

export async function getUserByToken(token: string): Promise<any> {
    try {

        const response = await axios.get(apiUrl + `/get_user_by_token/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const user = response.data;
        
        return new UserModel({
            id: user.id,
            status: user.status,
            email: user.email,
            name: user.name,
        });

    } catch (error: any) {

        // if (error && error.response && error.response.status === 401) {
        //     logout();
        // }
        
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
}

export async function getUsers(status: boolean, name: string, email: string): Promise<any> {
    try {

        let query = {
            status: status ? status : false,
            name: name ? name : null,
            email: email ? email : null,
        }

        const response = await axios.post(apiUrl + "/get_users", query, {
            headers: {
                'Authorization': `Bearer ${await getUserToken()}`
            }
        });
        
        return response.data.map((user: any) => new UserModel({
            id: user.id,
            status: user.status,
            email: user.email,
            name: user.name,
        }));

    } catch (error: any) {

        // if (error && error.response && error.response.status === 401) {
        //     logout();
        // }
        
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export async function getUser(id: string): Promise<any> {
    try {

        const response = await axios.get(apiUrl + `/get_user/${id}`, {
            headers: {
                'Authorization': `Bearer ${await getUserToken()}`
            }
        });

        const user = response.data;
        
        return new UserModel({
            id: user.id,
            status: user.status,
            email: user.email,
            name: user.name,
        });

    } catch (error: any) {

        // if (error && error.response && error.response.status === 401) {
        //     logout();
        // }
        
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
}



export async function verifyUser(email: string, password: string): Promise<any> {

    let query = {
        email: email,
        password: password
    }

    // try {
    //     const response = await axios.post(apiUrl + "/login", query);

    //     if (!response) {
    //         throw new Error('Las credenciales no son correctas.')
    //     }
      
    //     if (!response.data) {
    //         throw new Error('Las credenciales no son correctas.')      
    //     }
    
    //     return response.data;
    // } catch (error) {
    //     throw new Error('Las credenciales no son correctas.')
    // }

}

export async function updateUser(user: UserModel, password: string | null): Promise<any> {
    try {

        let query = {
            id : user.id ? user.id : null,
            name : user.name,
            email : user.email,
            password : password ? password : null,
            status : user.status,
        }

        const response = await axios.post(apiUrl + "/create_user", query, {
            headers: {
                'Authorization': `Bearer ${await getUserToken()}`
            }
        });
        
        return response;

    } catch (error) {
        // Manejar el error, por ejemplo:
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }

}