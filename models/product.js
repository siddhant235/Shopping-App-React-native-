class Product{
    constructor(id,ownerId,ownerPushToken,title,imageUrl,description,price){
        this.id=id;
        this.ownerId=ownerId;
        this.imageUrl=imageUrl;
        this.pushToken=ownerPushToken;
        this.title=title
        this.description=description;
        this.price=price;
    }
}
export default Product