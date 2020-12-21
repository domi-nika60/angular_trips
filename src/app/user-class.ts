import { User } from './User';

export class UserClass implements User {
    id: string;
    email: string;
    role: string;
    basketTrips: string[];
    username: string;
    password: string;

    constructor(id, email, role, basketTrips, username, password) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.basketTrips = basketTrips;
        this.username = username;
        this.password = password;

      }
}
