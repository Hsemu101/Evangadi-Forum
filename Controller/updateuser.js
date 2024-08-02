const bcrypt = require('bcrypt');
const MyDataBaseConnection = require("../db/db.config")

async function updateProfile(req, res) {
    const userId = req.user.userid; 
    const { username, firstname, lastname, email, currentPassword, newPassword, retypeNewPassword } = req.body;

    try {
        
        const updateFields = [];
        const values = [];
        let query = "UPDATE users SET ";

        // Check and add username to update query if provided
        if (username) {
            const [usernameExists] = await MyDataBaseConnection.query("SELECT * FROM users WHERE username = ? AND userid != ?", [username, userId]);
            if (usernameExists.length > 0) {
                return res.status(409).json({ msg: "Username already exists" });
            }
            updateFields.push("username = ?");
            values.push(username);
        }

        // Check and add email to update query if provided
        if (email) {
            const [emailExists] = await MyDataBaseConnection.query("SELECT * FROM users WHERE email = ? AND userid != ?", [email, userId]);
            if (emailExists.length > 0) {
                return res.status(409).json({ msg: "Email already exists" });
            }
            updateFields.push("email = ?");
            values.push(email);
        }

        // Add firstname and lastname to update query if provided
        if (firstname) {
            updateFields.push("firstname = ?");
            values.push(firstname);
        }

        if (lastname) {
            updateFields.push("lastname = ?");
            values.push(lastname);
        }

    
          // Handle password change logic only if any password field is provided
        if (currentPassword || newPassword || retypeNewPassword) {
            // Ensure all three password fields are provided
            if (!currentPassword || !newPassword || !retypeNewPassword) {
                return res.status(400).json({ msg: "To change the password, provide current password, new password, and retype new password" });
            }

            // Validate the new password length
            if (newPassword.length <= 8) {
                return res.status(400).json({ msg: "New password must be longer than 8 characters" });
            }

            // Ensure the new password and retype new password match
            if (newPassword !== retypeNewPassword) {
                return res.status(400).json({ msg: "New password and retype new password do not match" });
            }

            // Verify the current password
            const [user] = await MyDataBaseConnection.query("SELECT password FROM users WHERE userid = ?", [userId]);
            
            if (!user || user.length === 0) {
                return res.status(404).json({ msg: "User not found" });
            }

            const storedPasswordHash = user[0].password;

            // Ensure password exists
            if (!storedPasswordHash) {
                return res.status(500).json({ msg: "Stored password not found" });
            }

            const validPassword = await bcrypt.compare(currentPassword, storedPasswordHash);
            if (!validPassword) {
                return res.status(400).json({ msg: "Current password is incorrect" });
            }

            // Encrypt the new password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);
            updateFields.push("password = ?");
            values.push(hashPassword);
        }  


        // Finalize the update query
        query += updateFields.join(', ') + " WHERE userid = ?";
        values.push(userId);

        // Execute the update query
        await MyDataBaseConnection.query(query, values);

        return res.status(200).json({ msg: "Profile updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred while updating the profile" });
        
    }
  

}

module.exports = { updateProfile };


// async function updateProfile(req, res) {
//     const userId = req.userId; 
//     const { username, firstname, lastname, email, currentPassword, newPassword, retypeNewPassword } = req.body;

//     try {
//         console.log('User ID:', userId); // Debugging output

//         const updateFields = [];
//         const values = [];
//         let query = "UPDATE users SET ";

//         // Check and add username to update query if provided
//         if (username) {
//             const [usernameExists] = await MyDataBaseConnection.query("SELECT * FROM users WHERE username = ? AND userid != ?", [username, userId]);
//             if (usernameExists.length > 0) {
//                 return res.status(409).json({ msg: "Username already exists" });
//             }
//             updateFields.push("username = ?");
//             values.push(username);
//         }

//         // Check and add email to update query if provided
//         if (email) {
//             const [emailExists] = await MyDataBaseConnection.query("SELECT * FROM users WHERE email = ? AND userid != ?", [email, userId]);
//             if (emailExists.length > 0) {
//                 return res.status(409).json({ msg: "Email already exists" });
//             }
//             updateFields.push("email = ?");
//             values.push(email);
//         }

//         // Add firstname and lastname to update query if provided
//         if (firstname) {
//             updateFields.push("firstname = ?");
//             values.push(firstname);
//         }

//         if (lastname) {
//             updateFields.push("lastname = ?");
//             values.push(lastname);
//         }

//         // Handle password change logic only if any password field is provided
//         if (currentPassword || newPassword || retypeNewPassword) {
//             // Ensure all three password fields are provided
//             if (!currentPassword || !newPassword || !retypeNewPassword) {
//                 return res.status(400).json({ msg: "To change the password, provide current password, new password, and retype new password" });
//             }

//             // Validate the new password length
//             if (newPassword.length <= 8) {
//                 return res.status(400).json({ msg: "New password must be longer than 8 characters" });
//             }

//             // Ensure the new password and retype new password match
//             if (newPassword !== retypeNewPassword) {
//                 return res.status(400).json({ msg: "New password and retype new password do not match" });
//             }

//             // Verify the current password
//             const [user] = await MyDataBaseConnection.query("SELECT password FROM users WHERE userid = ?", [userId]);

//             if (!user || user.length === 0) {
//                 console.error('User not found in database');
//                 return res.status(404).json({ msg: "User not found" });
//             }

//             const storedPasswordHash = user[0].password;

//             // Ensure password exists
//             if (!storedPasswordHash) {
//                 return res.status(500).json({ msg: "Stored password not found" });
//             }

//             const validPassword = await bcrypt.compare(currentPassword, storedPasswordHash);
//             if (!validPassword) {
//                 return res.status(400).json({ msg: "Current password is incorrect" });
//             }

//             // Encrypt the new password
//             const salt = await bcrypt.genSalt(10);
//             const hashPassword = await bcrypt.hash(newPassword, salt);
//             updateFields.push("password = ?");
//             values.push(hashPassword);
//         }  

//         // Finalize the update query
//         query += updateFields.join(', ') + " WHERE userid = ?";
//         values.push(userId);

//         // Execute the update query
//         await MyDataBaseConnection.query(query, values);

//         return res.status(200).json({ msg: "Profile updated successfully" });
//     } catch (error) {
//         console.error("Error occurred:", error);
//         return res.status(500).json({ msg: "An error occurred while updating the profile" });
//     }
// }

// module.exports = { updateProfile };
