import { Client, Storage } from "appwrite";

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL) // Your Appwrite Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Your project ID

// Initialize Appwrite Storage
const storage = new Storage(client);

// Export the client and storage instances for use in other files
export { client, storage };
