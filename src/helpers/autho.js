class Auth {
    constructor(user) {
        this.isAuthenticated = false;
        this.role = user;
    }

    login() {
        this.isAuthenticated = true;
    }

    register() {
        this.isAuthenticated = true;
    }

    logout() {
        this.isAuthenticated = false;
    }
}

export default Auth;