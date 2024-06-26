import mongoose from "mongoose"

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.ATLAS_URI);
}

let pictureMetadata = new mongoose.Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
});

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
    avatar: {
        type: pictureMetadata
    },
    friends: [{
        type: String
    }],

    requests: [{
        reqType: String,
        user: String
    }]
});

  
export const User = mongoose.model('User', userSchema);


let groupSchema = new mongoose.Schema({

    users: [{type: String}],
    name: String,
    messages: [{user: String, message: String, createdAt: Date}],

});

export const Group = mongoose.model('Group', groupSchema);


let eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    createdBy: {
        type: String,
        required: true,
        unique: false
    },
    startDate: {
        type: Date,
        required: true,
        unique: false
    },
    endDate: {
        type: Date,
        required: true,
        unique: false
    },
    location: {
        type: String,
        required: true,
        unique: false
    },
    createTime:{
        type: Date,
        unique: false,
        required: true
    },
    guests: [{
        type: String
    }],
});

export const Event = mongoose.model('Event', eventSchema);


export function getClient() {
    return mongoose.connection.getClient();
}