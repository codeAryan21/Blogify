import config from "../config/config";
import { Storage, ID, Client } from "appwrite";

export class FileService {
    client = new Client()
    storage; // bucket 

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);

        this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Configuration-UploadFile error : ", error);
            return false
        }
    }

    async deleteFile(fileId) {
        console.log("File ID:", fileId);
        if (!fileId || typeof fileId !== "string") {
            console.log("DeleteFile error: Invalid fileId", fileId);
            return false;
        }
        console.log("Deleting File ID:", fileId);

        
        try {
            await this.storage.deleteFile(
                config.appwriteBucketID,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Configuration-DeleteFile error : ", error);
            return false
        }
    }

    getFilePreview(fileId) {
        console.log("File ID:", fileId);
        if (!fileId || typeof fileId !== "string") {
            console.log("GetFilePreview error: Invalid fileId", fileId);
            return false;
        }
        console.log("Getting preview for File ID:", fileId);
        

        try {
            return this.storage.getFileDownload(
                config.appwriteBucketID,
                fileId
            )
        } catch (error) {
            console.log("Configuration-GetFilePreview error:", error);
            return false;
        }
    }

}

const fileService = new FileService()
export default fileService;