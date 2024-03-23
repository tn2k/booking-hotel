const connection = require("../config/connectDB");

const getAllUser = async (req, res) => {
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

const createNewUser = async (req, res) => {
  let { firstName, lastName, email, password, phonenumber, gender, roleId } =
    req.body;

  console.log(
    "check data ",
    firstName,
    lastName,
    email,
    password,
    phonenumber,
    gender,
    roleId
  );

  try {
    await connection
      .promise()
      .execute(
        `INSERT INTO Users (firstName, lastName, email, password,  phonenumber, gender, roleId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [firstName, lastName, email, password, phonenumber, gender, roleId]
      );
    return res.send("Create new user success");
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
  createNewUser,
  getAllUser,
  geteditUser,
  putUser,
  deleteUser,
  Create,
};
