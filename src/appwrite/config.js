import { Client, Databases, ID } from 'appwrite';

const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT); // Your project ID

const databases = new Databases(client);


export { client, databases, ID };





