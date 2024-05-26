export interface UserCredentials {
    Password: string,
    Nickname: string,
    Email: string,
    ID: string,
}

export interface UserProfile {
    ID: string,
    Nickname: string,
    Email: string,
}

export interface MovieInfo {
    ID: number;
    Title: string;
    Overview: string;
    ReleaseDate: string;
    OriginalLanguage: string;
}


export interface MovieInfo {
    ID: number;
    Title: string;
    Overview: string;
    ReleaseDate: string;
    OriginalLanguage: string;
}
  
export class SubscriptionInfo{
    constructor(
        plan: string,
        price: number,
        description: string){
            this.plan = plan;
            this.price = price;
            this.description = description;
            this.isInfoOnly = true;
    }
    isInfoOnly: boolean = true;
    plan: string = ""
    price: number = 0;
    description: string = "";
}

export interface SubscriptionRequest{
    ID: number;
    User_ID: string;
    Plan: string;
    Price: number;
    Description: string;
    Status: string;
}
  
export interface PaymentInfo {
    date: string;
    amount: number;
    status: string;
}
  