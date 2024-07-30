// require("dotenv").config()
// const mysql2 = require("mysql2")

// const MyDataBaseConnection = mysql2.createPool({
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     password: process.env.DB_PASSWORD,
//     connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10)
// })

// // MyDataBaseConnection.execute("select 'test' ",(err, result) =>{
// //     if (err){
// //         console.log(err.message)
// //     }else{
// //         console.log(result)
// //     }
// // })

// module.exports = MyDataBaseConnection.promise()



require("dotenv").config()
const mysql2 = require("mysql2")

const MyDataBaseConnection = mysql2.createPool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10)
})

// MyDataBaseConnection.execute("select 'test' ",(err, result) =>{
//     if (err){
//         console.log(err.message)
//     }else{
//         console.log(result)
//     }
// })

module.exports = MyDataBaseConnection.promise()



