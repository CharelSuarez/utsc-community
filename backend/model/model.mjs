import mongoose from "mongoose"

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.ATLAS_URI);
}

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    friends: [{
        type: String
    }],
});


  
export const User = mongoose.model('user', userSchema);