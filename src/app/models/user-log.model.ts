export class UserLog{
    public id:number;
    public userID:number;
    public username:string;
    public userIP:string;
    public loginTime:string;
    public logoutTime:string;
    public status:number;

    constructor(init?:Partial<UserLog>){
        Object.assign(this,init);
    }
}