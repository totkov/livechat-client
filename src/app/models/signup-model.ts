export class SignUpModel {

    constructor(email: string, password: string, firstname: string, lastname: string) {
        this.email = email;
        this.password = password;
        this.firstName = firstname;
        this.lastName = lastname;
    }

    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
