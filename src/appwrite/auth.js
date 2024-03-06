import conf from "../conf/conf";
import {Client ,Account ,ID} from "appwrite";


/**
 * AuthService class handles authentication-related tasks.
 */
export class AuthService {
    client = new Client(); // Instance of a client used to interact with an external service
    
    account; // Property to hold an instance of the Account class for user account operations

    /**
     * Constructor for AuthService class.
     * Initializes the client and account properties.
     */
    constructor() {
        // Configure the client with the endpoint URL and project ID
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        // Initialize the account property with a new instance of Account
        this.account = new Account(this.client);
    }

    /**
     * Asynchronously creates a new user account.
     * @param {object} userData - Object containing user data including email, password, and name.
     * @returns {Promise<any>} - A promise that resolves with the created user account or rejects with an error.
     */
    async createAccount({ email, password, name }) {
        try {
            // Create a new user account using the provided data
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            // If the account creation is successful, call another method (currently commented out)
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
                // Return the user account if creation fails
                return userAccount;
            }
        } catch (error) {
            // Throw any errors that occur during the account creation process
            throw error;
        }
    }

    async login({email,password}){
        try {
            return  await this.account.createEmailSession(email,password);  
        } catch (error) {
            throw error ;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("AppWrite ::getCurrentUser :: error ", error);
        }

        return null;
    }

    async logout(){

        try {

            await this.account.deleteSessions()
            
        } catch (error) {
            console.log("APPwrite service :: logout :: error ",error);
        }

    }

}

const authService = new AuthService();


export default authService