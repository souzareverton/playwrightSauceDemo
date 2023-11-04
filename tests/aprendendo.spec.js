// @ts-check
const {test, expect} = require("@playwright/test");

test.describe('swag labs', () => {

    test.beforeEach(async ({page}) => {
        await page.goto("https://www.saucedemo.com/");
    })

    test('login erro', async ({page}) => {
        await page.getByRole("button", {name: "Login"}).click();
        // await page.getByText("Login").click();

        await expect(page.getByText("Epic sadface: Username is required")).toBeVisible();
    });

    test('login sucesso', async ({page}) => {
        await logar(page, "standard_user", "secret_sauce");

        await expect(page.getByText("Products", {exact: true})).toBeVisible();
    });

    test("adicionar item no carrinho", async ({page}) => {
        await logar(page, "standard_user", "secret_sauce");

        await page.getByTestId("add-to-cart-sauce-labs-backpack").click();

        await expect(page.getByTestId("remove-sauce-labs-backpack")).toBeVisible();
        await expect(page.getByTestId("remove-sauce-labs-backpack")).toHaveText("Remove");

    });

});

async function logar(page, login, senha){
    await page.getByRole("textbox", {name: "Username"}).fill(login);
    await page.getByRole("textbox", {name: "password"}).fill(senha);
    await page.getByRole("button", {name: "Login"}).click();
}