import conf from "../conf/conf";
import {Client ,Account ,ID, Databases,Storage, Query} from "appwrite";


export class Service {

    client  = new Client();
    databases;
    bucket;
    constructor(){
            
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)        

    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            
        } catch (error) {
            console.log("AppWrite :: createPost ::error", error );
        }
    }
}

    

const service = new Service()

export default service