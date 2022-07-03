const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./sequelize');
require('./models/users');
require('./models/projects');
require('./models/bugs');
require('./models/testers');
require('./models/members');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes/usersRoute"));
app.use("/api", require("./routes/projectsRoute"));
app.use("/api", require("./routes/bugsRoute"));
app.use("/api", require("./routes/testersRoute"));
app.use("/api", require("./routes/membersRoute"));
app.use("/api", require("./routes/deleteTesterRoute"));
app.use("/api", require("./routes/deleteMemberRoute"));

app.listen(port, async () => {
    console.log('The server is running on http://localhost:' + port);
    try {
        await sequelize.authenticate();
        console.log('The connection to the database has been initialised');
    } catch (error) {
        console.error(error);
    }
});
