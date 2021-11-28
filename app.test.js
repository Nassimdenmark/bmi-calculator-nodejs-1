const request = require('supertest');
const app = require('./app');

// Global variables
let page
let res
let delayTyping = 30;
const timeout = 100000

const inputHeight = "input#cm";
const inputWeight = "input#kg";
const bntSend = "input#btn_bmi_submit";

// BMI calculation test
describe("GET /result - Calculate BMI", () => {

    it("Should get landing page / with status 200", async () => {
        const res = await request(app).get("/")
        expect(res.statusCode).toBe(200)
    });

    it("The height(cm) field must contain a numeric value", async () => {
        const res = await request(app)
            .get(`/result?cm=${"."}&kg=${100}`)
        expect(res.redirect).toBe(true);
        expect(res.header["location"]).toBe("/");
    });

    it("The weight(kg) field must contain a numeric value", async () => {
        const res = await request(app)
            .get(`/result?cm=${180}&kg=${"-"}`)
        expect(res.redirect).toBe(false);
    });

    it("The height field must be > 0 to be able to progress", async () => {
        const res = await request(app)
            .get(`/result?cm=${0}&kg=${100}`)
        expect(res.redirect).toBe(true);
        expect(res.header["location"]).toBe("/")
    });

    it("The weight field must be > 0 to be able to perform calculation", async () => {
        const res = await request(app)
            .get(`/result?cm=${180}&kg=${0}`)
        expect(res.redirect).toBe(false);
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /result - Calculate BMI - User enters correct info & displays correct category & BMI calculation", () => {
    var regex = /\d+/g;

    it("User enters cm(180) kg(59) should return category(Underweight) & bmi(18.21)", async () => {

        const cm = 180
        const kg = 59
        const m = (parseInt(cm, 10) / 100)
        const bmiCalculation = (kg / (m * m)).toFixed(2);
        const bmiCategory = "Underweight";

        const res = await request(app)
            .get(`/result?cm=${cm}&kg=${kg}`)

        var string = res.text;
        var matches = string.match(regex);
        const massIndexFromResponse = parseFloat(matches[matches.length - 2]
            + "."
            + matches[matches.length - 1]);

        expect(massIndexFromResponse).toBe(parseFloat(bmiCalculation));
        expect(res.text.includes(bmiCategory));
    });

    it("User enters cm(180) kg(80) should return category(Healthy Weight) & bmi(24.69)", async () => {
        const cm = 180
        const kg = 80
        const m = (parseInt(cm, 10) / 100)
        const bmiCalculation = (kg / (m * m)).toFixed(2);
        const bmiCategory = "Healthy Weight";

        const res = await request(app)
            .get(`/result?cm=${cm}&kg=${kg}`)

        var string = res.text;
        var matches = string.match(regex);
        const massIndexFromResponse = parseFloat(matches[matches.length - 2]
            + "."
            + matches[matches.length - 1]);

        expect(massIndexFromResponse).toBe(parseFloat(bmiCalculation));
        expect(res.text.includes(bmiCategory));
    });

    it("User enters cm(180) kg(96) should return category(Overweight) & bmi(29.63)", async () => {
        const cm = 180
        const kg = 96
        const m = (parseInt(cm, 10) / 100)
        const bmiCalculation = (kg / (m * m)).toFixed(2);
        const bmiCategory = "Overweight";

        const res = await request(app)
            .get(`/result?cm=${cm}&kg=${kg}`)

        var string = res.text;
        var matches = string.match(regex);
        const massIndexFromResponse = parseFloat(matches[matches.length - 2]
            + "."
            + matches[matches.length - 1]);

        expect(massIndexFromResponse).toBe(parseFloat(bmiCalculation));
        expect(res.text.includes(bmiCategory));
    });

    it("User enters cm(180) kg(100) should return category(Obese) & bmi(30.86)", async () => {
        const cm = 180
        const kg = 100
        const m = (parseInt(cm, 10) / 100)
        const bmiCalculation = (kg / (m * m)).toFixed(2);
        const bmiCategory = "Obese";

        const res = await request(app)
            .get(`/result?cm=${cm}&kg=${kg}`)

        var string = res.text;
        var matches = string.match(regex);
        const massIndexFromResponse = parseFloat(matches[matches.length - 2]
            + "."
            + matches[matches.length - 1]);

        expect(massIndexFromResponse).toBe(parseFloat(bmiCalculation));
        expect(res.text.includes(bmiCategory));
    });

});

// Waist-to-hip calculation test
describe("GET /result - Waist-to-hip calculation", () => {
    const gender = "male";

    it("Should get landing page / with status 200", async () => {
        const res = await request(app).get("/")
        expect(res.statusCode).toBe(200)
    });

    it("The waist(cm) field must contain a numeric value", async () => {
        const res = await request(app)
            .get(`/result?gender=${gender}waist=${"."}&hip=${100}`)
        expect(res.redirect).toBe(true);
        expect(res.header["location"]).toBe("/");
    });

    it("The hip(kg) field must contain a numeric value", async () => {
        const res = await request(app)
            .get(`/result?gender=${gender}waist=${180}&hip=${"-"}`)
        expect(res.redirect).toBe(true);
    });

    it("The waist field must be > 0 to be able to progress", async () => {
        const res = await request(app)
            .get(`/result?gender=${gender}waist=${0}&hip=${100}`)
        expect(res.redirect).toBe(true);
        expect(res.header["location"]).toBe("/")
    });

    it("The hip field must be > 0 to be able to perform calculation", async () => {
        const res = await request(app)
            .get(`/result?gender=${gender}waist=${180}&hip=${0}`)
        expect(res.redirect).toBe(true);
        expect(res.statusCode).toBe(302);
    });
});

describe("GET /result - Waist-to-hip - User enters correct info & displays correct status & WHR calculation", () => {
    var regex = /\d+/g;

    // Male WHR calculation
    it("Male enters waist(92) hip(112) should return status(Low Health Risk) & whr(0.82)", async () => {
        const gender = "male";
        const waist = 92
        const hip = 112
        const whrCalculation = (waist / hip).toFixed(2);
        const healthStatus = "Low Health Risk";

        const res = await request(app)
            .get(`/result?gender=${gender}&waist=${waist}&hip=${hip}`)

        var string = res.text;
        var matches = string.match(regex);
        const massIndexFromResponse = parseFloat(matches[matches.length - 2]
            + "."
            + matches[matches.length - 1]);

        expect(massIndexFromResponse).toBe(parseFloat(whrCalculation));
        expect(res.text.includes(healthStatus));
    });

    it("Male enters waist(109) hip(112) should return stauts(Moderate risk) & whr(0.97)", async () => {
        const gender = "male";
        const waist = 109
        const hip = 112
        const whrCalculation = (waist / hip).toFixed(2);
        const healthStatus = "Moderate risk";

        const res = await request(app)
            .get(`/result?gender=${gender}&waist=${waist}&hip=${hip}`)

        var string = res.text;
        var matches = string.match(regex);
        const massIndexFromResponse = parseFloat(matches[matches.length - 2]
            + "."
            + matches[matches.length - 1]);

        expect(massIndexFromResponse).toBe(parseFloat(whrCalculation));
        expect(res.text.includes(healthStatus));
    });

    it("Male enters waist(120) hip(112) should return status(High risk) & bmi(1.07)", async () => {
        const gender = "male";
        const waist = 120
        const hip = 112
        const whrCalculation = (waist / hip).toFixed(2);
        const healthStatus = "High risk";

        const res = await request(app)
            .get(`/result?gender=${gender}&waist=${waist}&hip=${hip}`)

        var string = res.text;
        var matches = string.match(regex);
        const massIndexFromResponse = parseFloat(matches[matches.length - 2]
            + "."
            + matches[matches.length - 1]);

        expect(massIndexFromResponse).toBe(parseFloat(whrCalculation));
        expect(res.text.includes(healthStatus));
    });

    // Female WHR calculation
    it("Female enters waist(84) hip(108) should return status(Low Health Risk) & whr(0.78)", async () => {
        const gender = "female";
        const waist = 84
        const hip = 108
        const whrCalculation = (waist / hip).toFixed(2);
        const healthStatus = "Low Health Risk";

        const res = await request(app)
            .get(`/result?gender=${gender}&waist=${waist}&hip=${hip}`)

        var string = res.text;
        var matches = string.match(regex);
        const massIndexFromResponse = parseFloat(matches[matches.length - 2]
            + "."
            + matches[matches.length - 1]);

        expect(massIndexFromResponse).toBe(parseFloat(whrCalculation));
        expect(res.text.includes(healthStatus));
    });

    it("Female enters waist(92) hip(112) should return stauts(Moderate risk) & whr(0.82)", async () => {
        const gender = "female";
        const waist = 92
        const hip = 112
        const whrCalculation = (waist / hip).toFixed(2);
        const healthStatus = "Moderate risk";

        const res = await request(app)
            .get(`/result?gender=${gender}&waist=${waist}&hip=${hip}`)

        var string = res.text;
        var matches = string.match(regex);
        const massIndexFromResponse = parseFloat(matches[matches.length - 2]
            + "."
            + matches[matches.length - 1]);

        expect(massIndexFromResponse).toBe(parseFloat(whrCalculation));
        expect(res.text.includes(healthStatus));
    });

    it("Female enters waist(100) hip(112) should return status(High risk) & bmi(0.89)", async () => {
        const gender = "female";
        const waist = 100
        const hip = 112
        const whrCalculation = (waist / hip).toFixed(2);
        const healthStatus = "High risk";

        const res = await request(app)
            .get(`/result?gender=${gender}&waist=${waist}&hip=${hip}`)

        var string = res.text;
        var matches = string.match(regex);
        const massIndexFromResponse = parseFloat(matches[matches.length - 2]
            + "."
            + matches[matches.length - 1]);

        expect(massIndexFromResponse).toBe(parseFloat(whrCalculation));
        expect(res.text.includes(healthStatus));
    });
});