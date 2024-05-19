const connection = require("../config/connectDB");

const homePage = async (req, res, next) => {
  try {
    let [results, fields] = await connection
      .promise()
      .query(`SELECT * FROM Users`);
    return res.render("displayCRUD.ejs", { listUsers: results });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).send("Not Found user");
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    let [results, fields] = await connection
      .promise()
      .query(`SELECT * FROM Users`);
    let users = results;
    return res.status(200).json({
      EC: 0,
      EM: 'Get all users success!',
      users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).send("Not Found user");
  }
};


const createNewUser = async (req, res, next) => {
  let { firstName, lastName, email, password, phonenumber, gender, roleId } =
    req.body;
  try {
    await connection
      .promise()
      .execute(
        `INSERT INTO Users (firstName, lastName, email, password,  phonenumber, gender, roleId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [firstName, lastName, email, password, phonenumber, gender, roleId]
      );
    return res.status(201).json({
      EC: 0,
      EM: 'Create a new user success!',
    });
  } catch (error) {
    console.error("Error creating new user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const registerUser = async (req, res, next) => {
  return res.render("createCrud.ejs");
};

const getEditUser = async (req, res, next) => {
  let userId = req.params.id;
  try {
    const [results, fields] = await connection
      .promise()
      .execute(
        `SELECT * FROM Users WHERE id = ?`,
        [userId]
      );
    return res.render("editCRUD.ejs", { updateUser: results });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res, next) => {
  let { firstName, lastName, phonenumber, id } = req.body;
  try {
    const [results, fields] = await connection
      .promise()
      .execute(
        `UPDATE Users
      SET firstName = ?, lastName = ?, phonenumber = ?
      
      WHERE id = ? ;`,
        [firstName, lastName, phonenumber, id]
      );
    return res.status(201).json({
      EC: 0,
      EM: 'Update user success!',
    });
  } catch (error) {
    console.error("Error Update user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res, next) => {
  let userId = req.params.id;
  try {
    await connection
      .promise()
      .execute(
        `DELETE FROM Users WHERE id = ${userId} ;`,
      );
    return res.status(201).json({
      EC: 0,
      EM: 'Delete user success!',
    });
  } catch (error) {
    console.error("Error Delete user:", error);
    return res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  getAllUsers,
  createNewUser,
  registerUser,
  homePage,
  getEditUser,
  updateUser,
  deleteUser,
};
