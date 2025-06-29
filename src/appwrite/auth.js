import config from "../config/config.js";
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client();
    account;

    // when the object is created then only client is made and we have a proper access of a account that's why we were ceating a constructor
    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);
        console.log("Client initialized:", this.client);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (!userAccount) {
                return userAccount;
            } else {
                // call login method
                return this.login({ email, password }) // If account is created then we directly login the user
            }
        } catch (error) {
            // It's depend on either you throw the error or print the error
            console.log("Auth-CreateAccount error : ", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const userLoggedIn = await this.account.createEmailPasswordSession(email, password)
            return userLoggedIn;
        } catch (error) {
            console.log("Auth-Login error : ", error);
            // throw error;

            // Customize the error message
            if (error.message.includes("Password must be between 8 and 256 characters")) {
                throw new Error("Password should be at least 8 characters long.");
            } else {
                throw error; // Propagate other errors normally
            }
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Auth-GetCurrentUser error : ", error);
            throw error;
        }
        // return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Auth-Logout error : ", error);
            throw error;
        }
    }
}

const authService = new AuthService() // This is the object of the above class
export default authService; // we directly exporting the object of the class