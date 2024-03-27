const connection = require("../config/connectDB");

const homePage = async (req, res) => {
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

const getAllUser = async (req, res) => {
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


const createNewUser = async (req, res) => {
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

const Create = async (req, res) => {
  return res.render("createCrud.ejs");
};

const geteditUser = (req, res) => {
  return res.render("editCRUD.ejs");
};

const putUser = (req, res) => {
  return res.render("editCRUD.ejs");
};

const deleteUser = (req, res) => {
  return res.render("editCRUD.ejs");
};

module.exports = {
  getAllUser,
  createNewUser,
  homePage,
  geteditUser,
  putUser,
  deleteUser,
  Create,
};
