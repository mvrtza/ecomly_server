const { Schema, default: mongoose,model } = require("mongoose");

const userScheme = Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, },
    passwordHash: { type: String, required: true },
    street: String,
    apartement: String,
    city: String,
    postalCode: String,
    country: String,
    phone: { type: String, required: true, trim: true },
    isAdmin: { type: Boolean, default: false },
    resetPasswordOtp: Number,
    resetPasswordOtpExpires: Date,
    wishlist: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        productName: { type: String, required: true },
        productImage: { type: String, required: true },
        productPrice: { type: Number, required: true }

    }]
})
userScheme.index({email:1},{unique:true})
userScheme.set('toObject',{virtuals:true})
userScheme.set('toJSON',{virtuals:true})
exports.User = model('User',userScheme);