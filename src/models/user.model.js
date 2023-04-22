const { Schema, model } = require('mongoose');

const User = new Schema(
    {
        login: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        isAdmin: {
            type: String,
            require: true
        }
    },
    {collection: 'Users'}
)

module.exports = model('Users', User);