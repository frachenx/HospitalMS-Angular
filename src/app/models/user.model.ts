export class User{
    public id:number;
    public fullname:string;
    public address:string;
    public city:string;
    public gender:string;
    public email:string;
    public password:string;
    public createdDate:Date;
    public updatedDate:Date;

    constructor(init?:Partial<User>){
        Object.assign(this,init);
    }
}