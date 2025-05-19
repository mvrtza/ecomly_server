const {Schema,model} = require('mongoose')

const cartItemSchema = Schema(
    {
        product: {type: Schema.Types.ObjectId,ref:'Product',required:true},
        quantity: {type: Number,default:1},
        selectedSize: String,
        selectedColour:String,
        productName:{type:String,required:true},
        productImage:{type:String,required:true},
        productPrice:{type:Number,required:true},
        reservationExpiry:{type:Date,default:()=> new Date(Date.now() + 30 * 60 * 100)},
        reserved: {type:Boolean,default:true}
    }
)
cartItemSchema.set('toObject',{virtuals:true})
cartItemSchema.set('toJSON',{virtuals:true})
exports.CartItem = model('CartItem',cartItemSchema)