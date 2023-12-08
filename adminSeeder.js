
const User = require("./model/userModel")
const bcrypt = require("bcryptjs")



// Data seeding for Admin i.e. admin ko credentials chai database ma paile nai seed garne (static data)
// check whether admin exists or not

const adminSeeder = async ()=>{

const isAdminExists = await User.findOne({email : "admin@gmail.com"})

if(!isAdminExists){

    await User.create({
    
        email : "admin@gmail.com",
        password : bcrypt.hashSync("admin", 8) ,
        username : "admin",
        role : "admin"
    
    })
    console.log("Admin seeded successfully")
}else{
    console.log("Admin already seeded ")
}

}

module.exports = adminSeeder