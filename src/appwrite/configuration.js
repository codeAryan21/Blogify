import config from "../config/config.js";
import { Client, Databases, Query, Account } from "appwrite";

// Account Setup for Authentication
const client = new Client();
client
    .setEndpoint(config.appwriteURL)
    .setProject(config.appwriteProjectID);

export const account = new Account(client);


// Database Service
export class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);

        this.databases = new Databases(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            console.log("Creating post with data:", { title, slug, content, featuredImage, status, userId });
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug, // slug is the document ID
                { title, content, featuredImage, status, userId }
            )
        } catch (error) {
            console.log("Configuration-CreatePost error : ", error);
            throw error
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) { // slug is the document ID which we have to update
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                { title, content, featuredImage, status }
            )
        } catch (error) {
            console.log("Configuration-UpdatePost error : ", error);
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
            return true
        } catch (error) {
            console.log("Configuration-DeletePost error : ", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            console.log("Fetching post with slug:", slug);
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Configuration-GetPost error : ", error);
            return false
        }
    }

    async getAllPost(queries = [Query.equal("status", "active")]) { // getAllPost based on the queries
        try {
            console.log("Fetching all posts with queries:", queries);
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries,
                // [ Query.equal("status","active") ] // we can pass queries directly like this also
            )
        } catch (error) {
            console.log("Configuration-GetAllPost error : ", error);
            return false
        }
    }
 
    async getPostsByUser(userId) {
        try {
            console.log("Fetching posts by user:", userId);
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                [
                    Query.equal("userId", userId),
                    Query.equal("status", "active")
                ]
            );
        } catch (error) {
            console.log("Configuration-GetPostsByUser error : ", error);
            return { documents: [] };
        }
    }

}

const databaseService = new DatabaseService() 
export default databaseService; 