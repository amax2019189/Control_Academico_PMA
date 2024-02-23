const {Schema, model} = require('mongoose');

const RoleSchema = Schema ({
    role:{
        type:String,
        required: [true, "Role name is required"]
    }
});

module.exports = model ('Role', RoleSchema);