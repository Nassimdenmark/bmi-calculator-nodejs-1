const app = require('./app');

// Global variables
let page
let res
let delayTyping = 30;
const timeout = 100000

const inputHeight = "input#cm";
const inputWeight = "input#kg";
const bntSend = "input#btn_bmi_submit";

async function bmiCalculationSend(inputHeight, inputWeight, height, weight) {
    await page.click(inputHeight);
    await page.type(inputHeight, height, { delay: delayTyping });
    await page.click(inputWeight);
    await page.type(inputWeight, weight, { delay: delayTyping });

    await page.click(bntSend);
    await page.waitFor(5000);
}

describe(
    '/ (Landing page)',
    () => {

        beforeAll(async () => {
            app.listen(8081);
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8081/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("The height(cm) field must contain a numeric value", async () => {
            const height = "."
            const weight = "100"
            const landingPage = "http://192.168.68.106:8081/"

            await bmiCalculationSend(inputHeight, inputWeight, height, weight);
            expect(page.url()).toBe(landingPage);
        });
        expect(true);
    },
    timeout
)

describe(
    '/ (Landing page)',
    () => {

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8081/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("The weight(kg) field must contain a numeric value", async () => {
            const height = "180"
            const weight = "-"
            const landingPage = "http://192.168.68.106:8081/"

            await bmiCalculationSend(inputHeight, inputWeight, height, weight);
            expect(page.url()).toBe(landingPage);
        });
    },
    timeout
)

describe(
    '/ (Landing page)',
    () => {

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8081/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("The height field must be > 0 to be able to progress", async () => {
            const height = "0"
            const weight = "100"
            const landingPage = "http://192.168.68.106:8081/"

            await bmiCalculationSend(inputHeight, inputWeight, height, weight);
            expect(page.url()).toBe(landingPage);
        });
    },
    timeout
)

describe(
    '/ (Landing page)',
    () => {

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8081/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("The weight field must be > 0 to be able to calculate", async () => {
            const height = "180"
            const weight = "0"
            const bmiIndex = "#bmi_index"
            const landingPage = `http://192.168.68.106:8081/result?cm=${height}&kg=${weight}`

            await bmiCalculationSend(inputHeight, inputWeight, height, weight);

            let text = await page.evaluate(el => el.innerHTML, await page.$(bmiIndex))
            expect(text).toContain("0");
            expect(page.url()).toBe(landingPage);
        });
    },
    timeout
)

describe(
    '/ (GET /result - Calculate correct BMI (Underweight))',
    () => {

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8081/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("User enters cm(180) kg(59) should return category(Underweight) & bmi(18.21)", async () => {
            const height = "180"
            const weight = "59"
            const bmiShouldEqual = "18.21"
            const healthStatusShouldEqual = "Underweight"
            const bmiIndexId = "#bmi_index"
            const healthStatusId = "#health_status"
            const landingPage = `http://192.168.68.106:8081/result?cm=${height}&kg=${weight}`

            await bmiCalculationSend(inputHeight, inputWeight, height, weight);

            let bmiIndex = await page.evaluate(el => el.innerHTML, await page.$(bmiIndexId))
            let healthStatus = await page.evaluate(el => el.innerHTML, await page.$(healthStatusId))
            expect(bmiIndex).toContain(bmiShouldEqual);
            expect(healthStatus).toContain(healthStatusShouldEqual);
            expect(page.url()).toBe(landingPage);
        });
    },
    timeout
)

describe(
    '/ (GET /result - Calculate correct BMI (Healthy Weight))',
    () => {

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8081/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("User enters cm(180) kg(80) should return category(Healthy Weight) & bmi(24.69)", async () => {
            const height = "180"
            const weight = "80"
            const bmiShouldEqual = "24.69"
            const healthStatusShouldEqual = "Healthy Weight"
            const bmiIndexId = "#bmi_index"
            const healthStatusId = "#health_status"
            const landingPage = `http://192.168.68.106:8081/result?cm=${height}&kg=${weight}`

            await bmiCalculationSend(inputHeight, inputWeight, height, weight);

            let bmiIndex = await page.evaluate(el => el.innerHTML, await page.$(bmiIndexId))
            let healthStatus = await page.evaluate(el => el.innerHTML, await page.$(healthStatusId))
            expect(bmiIndex).toContain(bmiShouldEqual);
            expect(healthStatus).toContain(healthStatusShouldEqual);
            expect(page.url()).toBe(landingPage);
        });
    },
    timeout
)

describe(
    '/ (GET /result - Calculate correct BMI (Healthy Weight))',
    () => {

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8081/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("User enters cm(180) kg(96) should return category(Overweight) & bmi(29.63)", async () => {
            const height = "180"
            const weight = "96"
            const bmiShouldEqual = "29.63"
            const healthStatusShouldEqual = "Overweight"
            const bmiIndexId = "#bmi_index"
            const healthStatusId = "#health_status"
            const landingPage = `http://192.168.68.106:8081/result?cm=${height}&kg=${weight}`

            await bmiCalculationSend(inputHeight, inputWeight, height, weight);

            let bmiIndex = await page.evaluate(el => el.innerHTML, await page.$(bmiIndexId))
            let healthStatus = await page.evaluate(el => el.innerHTML, await page.$(healthStatusId))
            expect(bmiIndex).toContain(bmiShouldEqual);
            expect(healthStatus).toContain(healthStatusShouldEqual);
            expect(page.url()).toBe(landingPage);
        });
    },
    timeout
)

describe(
    '/ (GET /result - Calculate correct BMI (Healthy Weight))',
    () => {

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8081/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("User enters cm(180) kg(100) should return category(Obese) & bmi(30.86)", async () => {
            const height = "180"
            const weight = "100"
            const bmiShouldEqual = "30.86"
            const healthStatusShouldEqual = "Obese"
            const bmiIndexId = "#bmi_index"
            const healthStatusId = "#health_status"
            const landingPage = `http://192.168.68.106:8081/result?cm=${height}&kg=${weight}`

            await bmiCalculationSend(inputHeight, inputWeight, height, weight);

            let bmiIndex = await page.evaluate(el => el.innerHTML, await page.$(bmiIndexId))
            let healthStatus = await page.evaluate(el => el.innerHTML, await page.$(healthStatusId))
            expect(bmiIndex).toContain(bmiShouldEqual);
            expect(healthStatus).toContain(healthStatusShouldEqual);
            expect(page.url()).toBe(landingPage);
        });
    },
    timeout
)