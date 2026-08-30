export class APIutils {


    constructor(apiContext,loginplayLoad) {

        this.apiContext = apiContext;
        this.loginPlayload =loginplayLoad;

    }


    async getToken() {

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPlayload
            }
        )
        //expect(loginResponse.ok()).toBeTruthy();

        const loginResponseJson = await loginResponse.json();

        const token = loginResponseJson.token;
        console.log(token)

        return token;


    }

    async createOrder(orderPlayLoad) {

        let response ={};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {

            data: orderPlayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': "application/json"
            }

        })

        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId =orderId;
        return response;
    }
}