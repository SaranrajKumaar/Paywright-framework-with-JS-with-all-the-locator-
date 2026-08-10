import { Page, Locator, expect  } from '@playwright/test';

export class checkOutPage{

    readonly page :Page;
    readonly productname :Locator;
    readonly suggest :Locator;
    readonly country :Locator;
    readonly term: Locator;
    readonly sucessMessage :Locator;

    constructor(page: Page){
        this.page = page;
        this.productname = this.page.locator('.media-heading a').first();
        this.suggest =this.page.locator('.suggestions')
        this.country = this.page.locator('#country')
        this.term =this.page.locator('#checkbox2');
        this.sucessMessage=this.page.locator("#div[class*='alert-success']")
    }

    async checkOutPage(){
        const text =this.productname.textContent()
       expect (await text ).toContain('Samsung Note 8');
       await this.page.getByRole('button',{name:"Checkout"}).click();
       await this.country.pressSequentially("ind");
       //indonesia
       await this.suggest.getByText('Indonesia', { exact: true }).click();
       await this.term.click();

       await this.page.getByRole("button",{name:'Purchase'}).click();
       const success = (await this.sucessMessage.textContent()) ?? '';

        expect(success.trim()).toContain('Success');



       


    }
}


