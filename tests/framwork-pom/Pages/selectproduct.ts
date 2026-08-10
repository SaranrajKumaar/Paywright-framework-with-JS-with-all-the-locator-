import { Page, Locator  } from '@playwright/test';


export class selectProduct{

    readonly page: Page;
    readonly product:Locator
    constructor(page:Page){

        this.page = page;

        this.product = page.locator("app-card");
        


    }

    async products(){
        const productName="Samsung Note 8"
        await this.product.first().waitFor();
        const count = await this.product.count();
        for(let i=0;i< count;i++){

            const name =await this.product.nth(i).locator('h4 a').textContent();
            console.log(name)
            if( name?.trim()=== productName){
                this.product.nth(i).getByRole('button',{name:"Add"}).click();
                break;

            }

        }

        //checkout
       await this.page.locator('.nav-link.btn.btn-primary').click();

    }
}