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

  
export const User = mongoose.model('User', userSchema);


let eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    guest: [{
        type: userSchema,
    }],
});

export const Event = mongoose.model('Event', eventSchema);


export function getClient() {
    return mongoose.connection.getClient();
}