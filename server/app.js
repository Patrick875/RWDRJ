const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const authRouter = require("./routes/authRouter");
const blogRouter = require("./routes/blogRouter");
const eventsRouter = require("./routes/eventRouter");
const newsRouter = require("./routes/newsRouter");
const siteInfoRouter = require("./routes/siteInfoRoutes");
const aboutusRouter = require("./routes/aboutUsPageRouter");
const contactusRouter = require("./routes/contactUsPageRouter");
const compaignRouter = require("./routes/compaignPageRouter");
const advocacyRouter = require("./routes/advocacyPageRouter");
const trainingRouter = require("./routes/trainingPageRouter");
const digitalInfoRouter = require("./routes/digitalRouter");
const partnerRouter = require("./routes/partnerRouter");
const teamMemberRouter = require("./routes/teamMemberRouter");
const ourTeamPageRouter = require("./routes/ourTeamPageRouter");
const pagesRouter = require("./routes/pagesRouter");
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "300mb" }));
app.use(express.urlencoded({ limit: "300mb" }));
app.use(cors({ origin: "*" }));
app.options("*", cors());

app.use(express.static(path.join(__dirname, "public")));

// Handle other routes by serving the index.html
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

//api routes

app.use("/api/", siteInfoRouter);
app.use("/api/aboutus", aboutusRouter);
app.use("/api/contactus", contactusRouter);
app.use("/api/compaign", compaignRouter);
app.use("/api/training", trainingRouter);
app.use("/api/advocacy", advocacyRouter);
app.use("/api/ourteam", ourTeamPageRouter);
app.use("/api/partners", partnerRouter);
app.use("/api/teammembers", teamMemberRouter);
app.use("/api/digitalhealth", digitalInfoRouter);

app.use("/api/admin", authRouter);
app.use("/api/pages", pagesRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/events", eventsRouter);
app.use("/api/news", newsRouter);

module.exports = app;
