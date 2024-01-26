const connection = require('../config/connectDB');

const getAllUser = async (req, res) => {
    try {
        let [results, fields] = await connection.promise().query(`SELECT * FROM Users`);
        return res.render('displayCRUD.ejs', { listUsers: results });
    } catch (error) {
        console.error('Error retrieving users:', error);
        return res.status(500).send('Internal Server Error');
    }
}


const Create = async (req, res) => {
    return res.render('createCrud.ejs');
}

const createNewUser = async (req, res) => {
    let { email, password, firstName, lastName, phonenumber, gender, roleId } = req.body;

    try {
        await connection.promise().execute(
            `INSERT INTO Users (email, password, firstName, lastName, phonenumber, gender, roleId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [email, password, firstName, lastName, phonenumber, gender, roleId]
        );
        return res.send('Create new user success');
    } catch (error) {
        console.error('Error creating new user:', error);
        return res.status(500).send('Internal Server Error');
    }
};

const geteditUser = (req, res) => {
    res.render('editCRUD.ejs');
}

const putUser = (req, res) => {
    res.render('editCRUD.ejs');
}


const deleteUser = (req, res) => {
    res.render('editCRUD.ejs');
}

module.exports = { createNewUser, getAllUser, geteditUser, putUser, deleteUser, Create };
