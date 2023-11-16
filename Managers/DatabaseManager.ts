import mongoose from "mongoose";

class DatabaseManager {
  private static instance: DatabaseManager;
  private isConnected: boolean = false;

  private constructor() {
    mongoose.set("strictQuery", true);
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public async connectToDB(): Promise<void> {
    if (this.isConnected) {
      console.log("MongoDB connection already established");
      return;
    }

    try {
      await mongoose.connect(process.env.DB_URI);
      this.isConnected = true;
      console.log("MongoDB connected");
    } catch (error) {
      console.error(`ERROR: ${error}`);
      throw new Error("Failed to connect to the database");
    }
  }

  // public async fetchUser(userId: string) {
  //   try {
  //     await this.connectToDB();
  //     return await User.findOne({ id: userId });
  //   } catch (err: any) {
  //     throw new Error(`Failed to fetch user: ${err.message}`);
  //   }
  // }

  // Add other database-related methods here
}

export default DatabaseManager;
