const app = require('./app');

// Global variables
let page
let res
let delayTyping = 30;
const timeout = 100000

// Landing page
const inputGender = "input#"
const inputWaist = "input#waist_cm";
const inputHip = "input#hip_cm";
const bntSend = "input#btn_whr_submit";

// Result
const whrIndexId = "#whr_index"
const healthStatusId = "#whr_health_index"

async function whrCalculationSend(inputGender, inputWaist, inputHip, gender, waist, hip) {
    await page.click(inputGender + gender)
    await page.type(inputGender + gender, inputGender + gender, { delay: delayTyping });
    await page.click(inputWaist);
    await page.type(inputWaist, waist, { delay: delayTyping });
    await page.click(inputHip);
    await page.type(inputHip, hip, { delay: delayTyping });

    await page.click(bntSend);
    await page.waitFor(5000);
}

describe(
    '/ (GET /result (Male low) Waist-to-hip flow)',
    () => {

        beforeAll(async () => {
            app.listen(8082);
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8082/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("Male enters waist(92) hip(112) should return status(Low Health Risk) & whr(0.82)", async () => {
            const gender = "male"
            const waist = "92"
            const hip = "112"
            const whrShouldEqual = (waist / hip).toFixed(2); // 0.82
            const healthStatusShouldEqual = "Low Health Risk"

            await whrCalculationSend(inputGender, inputWaist, inputHip, gender, waist, hip)

            let whrIndex = await page.evaluate(el => el.innerHTML, await page.$(whrIndexId))
            let healthStatus = await page.evaluate(el => el.innerHTML, await page.$(healthStatusId))
            expect(whrIndex).toContain(whrShouldEqual);
            expect(healthStatus.toLowerCase()).toContain(healthStatusShouldEqual.toLowerCase());
        });
    },
    timeout
)

describe(
    '/ (GET /result (Male medium) Waist-to-hip flow)',
    () => {

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8082/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("Male enters waist(109) hip(112) should return stauts(Moderate risk) & whr(0.97)", async () => {
            const gender = "male"
            const waist = "109"
            const hip = "112"
            const whrShouldEqual = (waist / hip).toFixed(2); // 0.97
            const healthStatusShouldEqual = "Moderate risk"

            await whrCalculationSend(inputGender, inputWaist, inputHip, gender, waist, hip)

            let whrIndex = await page.evaluate(el => el.innerHTML, await page.$(whrIndexId))
            let healthStatus = await page.evaluate(el => el.innerHTML, await page.$(healthStatusId))
            expect(whrIndex).toContain(whrShouldEqual);
            expect(healthStatus.toLowerCase()).toContain(healthStatusShouldEqual.toLowerCase());
        });
    },
    timeout
)

describe(
    '/ (GET /result (Male high) Waist-to-hip flow)',
    () => {

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8082/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("Male enters waist(120) hip(112) should return status(High risk) & bmi(1.07)", async () => {
            const gender = "male"
            const waist = "120"
            const hip = "112"
            const whrShouldEqual = (waist / hip).toFixed(2); // 1.07
            const healthStatusShouldEqual = "High risk"

            await whrCalculationSend(inputGender, inputWaist, inputHip, gender, waist, hip)

            let whrIndex = await page.evaluate(el => el.innerHTML, await page.$(whrIndexId))
            let healthStatus = await page.evaluate(el => el.innerHTML, await page.$(healthStatusId))
            expect(whrIndex).toContain(whrShouldEqual);
            expect(healthStatus.toLowerCase()).toContain(healthStatusShouldEqual.toLowerCase());
        });
    },
    timeout
)

// Female WHR calculation
describe(
    '/ (GET /result (Female low) Waist-to-hip flow)',
    () => {

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8082/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("Female enters waist(84) hip(108) should return status(Low Health Risk) & whr(0.78)", async () => {
            const gender = "female"
            const waist = "84"
            const hip = "108"
            const whrShouldEqual = (waist / hip).toFixed(2); // 0.78
            const healthStatusShouldEqual = "Low health risk"

            await whrCalculationSend(inputGender, inputWaist, inputHip, gender, waist, hip)

            let whrIndex = await page.evaluate(el => el.innerHTML, await page.$(whrIndexId))
            let healthStatus = await page.evaluate(el => el.innerHTML, await page.$(healthStatusId))
            expect(whrIndex).toContain(whrShouldEqual);
            expect(healthStatus.toLowerCase()).toContain(healthStatusShouldEqual.toLowerCase());
        });
    },
    timeout
)

describe(
    '/ (GET /result (Female medium) Waist-to-hip flow)',
    () => {

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8082/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("Female enters waist(92) hip(112) should return stauts(Moderate risk) & whr(0.82)", async () => {
            const gender = "female"
            const waist = "92"
            const hip = "112"
            const whrShouldEqual = (waist / hip).toFixed(2); // 0.82
            const healthStatusShouldEqual = "Moderate risk"

            await whrCalculationSend(inputGender, inputWaist, inputHip, gender, waist, hip)

            let whrIndex = await page.evaluate(el => el.innerHTML, await page.$(whrIndexId))
            let healthStatus = await page.evaluate(el => el.innerHTML, await page.$(healthStatusId))
            expect(whrIndex).toContain(whrShouldEqual);
            expect(healthStatus.toLowerCase()).toContain(healthStatusShouldEqual.toLowerCase());
        });
    },
    timeout
)

describe(
    '/ (GET /result (Female high) Waist-to-hip flow)',
    () => {

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage()
            res = await page.goto('http://192.168.68.106:8082/')
            await page.waitFor(3000);
        }, timeout)

        afterAll(async () => {
            await page.close()
        })

        it("Female enters waist(100) hip(112) should return status(High risk) & bmi(0.89)", async () => {
            const gender = "female"
            const waist = "100"
            const hip = "112"
            const whrShouldEqual = (waist / hip).toFixed(2); // 0.92
            const healthStatusShouldEqual = "High risk"

            await whrCalculationSend(inputGender, inputWaist, inputHip, gender, waist, hip)

            let whrIndex = await page.evaluate(el => el.innerHTML, await page.$(whrIndexId))
            let healthStatus = await page.evaluate(el => el.innerHTML, await page.$(healthStatusId))
            expect(whrIndex).toContain(whrShouldEqual);
            expect(healthStatus.toLowerCase()).toContain(healthStatusShouldEqual.toLowerCase());
        });
    },
    timeout
)