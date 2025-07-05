import config from "../config/config.js";
import { Client, Databases, Query, Account } from "appwrite";

// Account Setup for Authentication
const client = new Client();
client
    .setEndpoint(config.appwriteURL)
    .setProject(config.appwriteProjectID);

export const account = new Account(client);


// Helper to pick only allowed fields
function pickPostFields(post) {
    return {
        title: post.title,
        content: post.content,
        featuredImage: post.featuredImage,
        status: post.status,
        userId: post.userId,
        ownerName: post.ownerName || "Unknown",
        likes: post.likes,
        comments: post.comments,
    };
}

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

    async createPost({ title, slug, content, featuredImage, status, userId, ownerName }) {
        try {
            console.log("Creating post with data:", { title, slug, content, featuredImage, status, userId });
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug, // slug is the document ID
                { title, content, featuredImage, status, userId, ownerName, likes: [], comments: [] }
            )
        } catch (error) {
            console.log("Configuration-CreatePost error : ", error);
            throw error
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) { // slug is the document ID which we have to update
        try {
            // Fetch the full document to get all required fields
            const post = await this.getPost(slug);
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    ...post,
                    title,
                    content,
                    featuredImage,
                    status
                }
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

    // Toggle Like
    async toggleLike(postId, userId, likesArray = []) {
        try {
            // Fetch the full post to get all required fields
            const post = await this.getPost(postId);

            const newLikes = likesArray.includes(userId)
                ? likesArray.filter(id => id !== userId)
                : [...likesArray, userId];

            // Always include all required fields in the update
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                postId,
                {
                    ...pickPostFields(post),
                    likes: newLikes
                }
            );
        } catch (error) {
            console.log("Configuration-ToggleLike error:", error);
            throw error;
        }
    }

    // Add Comment
    async addComment(postId, commentsArray = [], newComment) {
        try {
            const post = await this.getPost(postId);

            // Store comments as JSON strings
            const updatedComments = [...commentsArray, JSON.stringify(newComment)];
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                postId,
                {
                    ...pickPostFields(post),
                    comments: updatedComments
                }
            );
        } catch (error) {
            console.log("Configuration-AddComment error:", error);
            throw error;
        }
    }
    
    // When deleting a comment, compare after parsing:
    async deleteComment(postId, commentsArray = [], commentCreatedAt) {
        try {
            const post = await this.getPost(postId);

            // Parse, filter, and re-stringify
            const updatedComments = commentsArray
                .map(c => typeof c === "string" ? JSON.parse(c) : c)
                .filter(c => c.createdAt !== commentCreatedAt)
                .map(c => JSON.stringify(c));

            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                postId,
                {
                    ...pickPostFields(post),
                    comments: updatedComments
                }
            );
        } catch (error) {
            console.log("Configuration-DeleteComment error:", error);
            throw error;
        }
    }
}

const databaseService = new DatabaseService()
export default databaseService;