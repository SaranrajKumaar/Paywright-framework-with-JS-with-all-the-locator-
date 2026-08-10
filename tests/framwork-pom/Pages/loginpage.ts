import { Page, Locator  } from '@playwright/test';


export class loginPage{

    readonly page: Page;
    readonly username :Locator;
    readonly password : Locator;
    readonly signIn : Locator;
    readonly adminUser :Locator;
    readonly okayBtn:Locator
    readonly select :Locator;
    readonly checkbox : Locator;
    readonly errorMessage: Locator;


    constructor(page :Page){
        this.page =page;
        this.username = page.locator("#username");
        this.password = page.locator("#password");
        this.adminUser =page.locator(".customradio").last();
        this.okayBtn =page.locator("#okayBtn");
        this.select =page.locator("select.form-control");
        this.checkbox =page.locator(".text-info span");
        this.signIn =page.locator("#signInBtn");
        this.errorMessage =page.locator('div.alert.alert-danger')


    }


    async navigateToLoginPage(){
          await this.page.goto(
            'https://rahulshettyacademy.com/loginpagePractise/'
        );
    }

    async loginSteps(username:string,password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.adminUser.click();
        await this.okayBtn.click();
        await this.select.selectOption("Consultant");
        await this.signIn.click();


    }

    async getErrorMessage(){
       await  this.errorMessage.waitFor();
       return await this.errorMessage.textContent();
        
    }
}

