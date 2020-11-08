const app = require("express")();
const config = require("config");
const cors =  require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(cors());

// Import routes
const tasksRoutes = require("./routes/tasks"); 

const PORT = config.get("port") || 3020;

app.use(bodyParser.json());
app.use("/tasks", tasksRoutes);

async function startApp() {
    try {
        await mongoose.connect(config.get("mongoUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}...`);
        })
    } catch (e) {
        process.exit(1);
    }
}

startApp();

