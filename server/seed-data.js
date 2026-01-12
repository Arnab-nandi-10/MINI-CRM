import mongoose from "mongoose";
import dotenv from "dotenv";
import Client from "./src/models/Client.js";
import Lead from "./src/models/Lead.js";
import Task from "./src/models/Task.js";
import User from "./src/models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mini-crm";

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Get admin user
    const admin = await User.findOne({ email: "admin@crm.com" });
    if (!admin) {
      console.log("Admin user not found. Please run seed-admin.js first.");
      process.exit(1);
    }

    // Clear existing data
    await Client.deleteMany({});
    await Lead.deleteMany({});
    await Task.deleteMany({});

    // Create test clients
    const clients = await Client.insertMany([
      { name: "Acme Corp", companyName: "Acme Corporation", email: "contact@acme.com", phone: "123-456-7890", createdBy: admin._id },
      { name: "Tech Solutions", companyName: "Tech Solutions Ltd", email: "hello@techsol.com", phone: "234-567-8901", createdBy: admin._id },
      { name: "Global Industries", companyName: "Global Industries Inc", email: "info@global.com", phone: "345-678-9012", createdBy: admin._id },
      { name: "Innovate Labs", companyName: "Innovate Labs Co", email: "contact@innovate.com", phone: "456-789-0123", createdBy: admin._id },
      { name: "Future Systems", companyName: "Future Systems Corp", email: "sales@future.com", phone: "567-890-1234", createdBy: admin._id },
    ]);
    console.log(`Created ${clients.length} clients`);

    // Create test leads with different statuses
    const leadData = [
      { client: clients[0]._id, status: "New", assignedTo: admin._id },
      { client: clients[0]._id, status: "In Progress", assignedTo: admin._id },
      { client: clients[1]._id, status: "Converted", assignedTo: admin._id },
      { client: clients[1]._id, status: "Lost", assignedTo: admin._id },
      { client: clients[2]._id, status: "New", assignedTo: admin._id },
      { client: clients[2]._id, status: "In Progress", assignedTo: admin._id },
      { client: clients[3]._id, status: "Converted", assignedTo: admin._id },
      { client: clients[3]._id, status: "New", assignedTo: admin._id },
      { client: clients[4]._id, status: "In Progress", assignedTo: admin._id },
      { client: clients[4]._id, status: "Lost", assignedTo: admin._id },
    ];
    const leads = await Lead.insertMany(leadData);
    console.log(`Created ${leads.length} leads`);

    // Create test tasks
    const taskData = [
      { title: "Follow up with Acme", type: "Task", assignedTo: admin._id, client: clients[0]._id, priority: "High", status: "Pending" },
      { title: "Send proposal to Tech Solutions", type: "Task", assignedTo: admin._id, client: clients[1]._id, priority: "Medium", status: "Completed" },
      { title: "Meeting with Global Industries", type: "Meeting", assignedTo: admin._id, client: clients[2]._id, priority: "High", status: "Pending" },
      { title: "Finalize contract", type: "Task", assignedTo: admin._id, client: clients[3]._id, priority: "Medium", status: "Pending" },
      { title: "Demo call with Future Systems", type: "Meeting", assignedTo: admin._id, client: clients[4]._id, priority: "Low", status: "Completed" },
    ];
    const tasks = await Task.insertMany(taskData);
    console.log(`Created ${tasks.length} tasks`);

    console.log("\nDatabase seeded successfully!");
    console.log("Summary:");
    console.log(`- ${clients.length} Clients`);
    console.log(`- ${leads.length} Leads`);
    console.log(`- ${tasks.length} Tasks`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seedDatabase();
