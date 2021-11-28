var express = require("express");

// create express app
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.render("pages/landing");
});

app.get("/result", (req, res) => {
    req.query.gender
        ? WaistToHip(req, res)
        : BMI(req, res)
});

function BMI(req, res) {
    var m = (parseInt(req.query.cm, 10) / 100);
    var kg = req.query.kg;

    if (m == 0 || isNaN(m)) {
        return res.redirect("/");
    } else {
        var bmi = (kg / (m * m)).toFixed(2);
        var healthWeight = ["Underweight", "Healthy Weight", "Overweight", "Obese", "Undefined"];

        if (bmi < 18.50) {
            healthWeight = healthWeight[0];
        } else if (bmi > 18.50 && bmi < 24.90) {
            healthWeight = healthWeight[1];
        } else if (bmi > 25.00 && bmi < 29.90) {
            healthWeight = healthWeight[2];
        } else {
            healthWeight = healthWeight[3]
        }

        return res.render("pages/result", {
            calculation: bmi,
            healthWeight: healthWeight,
            type: "bmi"
        });
    }
}

function WaistToHip(req, res) {
    var gender = req.query.gender;
    var waist = (parseInt(req.query.waist, 10) / 100);
    var hip = (parseInt(req.query.hip, 10) / 100);

    if (waist == 0 || isNaN(waist) || hip == 0 || isNaN(hip)) {

        return res.redirect("/");
    } else {
        var waistToHip = waist / hip;
        var healthWeight = ["Low health risk", "Moderate risk", "High risk"];

        if (gender === "female") {
            if (waistToHip <= 0.80) {
                healthWeight = healthWeight[0];
            } else if (waistToHip >= 0.81 && waistToHip <= 0.84) {
                healthWeight = healthWeight[1];
            } else if (waistToHip >= 0.85) {
                healthWeight = healthWeight[2]
            }
        }
        if (gender === "male") {
            if (waistToHip <= 0.95) {
                healthWeight = healthWeight[0];
            } else if (waistToHip >= 0.96 && waistToHip <= 1.00) {
                healthWeight = healthWeight[1];
            } else if (waistToHip >= 1.00) {
                healthWeight = healthWeight[2]
            }
        }

        return res.render("pages/result", {
            calculation: waistToHip,
            healthWeight: healthWeight,
            type: "whr"
        });
    }
}

module.exports = app;

// var port = 8080;
// console.log("App is running on http://localhost:" + port)
// app.listen(port);
