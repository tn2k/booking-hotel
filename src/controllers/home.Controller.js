const createHttpError = require("http-errors");
const { getAllUsers, createUser, getDataUser, updateDataUser, deleteDataUser } = require("../services/user.service");
const { OK, CREATED, SuccessResponse } = require("../core/success.response")
const { ApiLogin, logout } = require("./User.Controller");
const { create } = require("lodash");

const homePage = async (req, res, next) => {
  try {
    let data = await getAllUsers();
    return res.render("displayCRUD.ejs", { listUsers: data.data });
  } catch (error) {
    console.error(error)
    next(error)
  }
};


const login = async (keyStore) => {
  new SuccessResponse({
    message: "Logout User success !",
    metadata: await ApiLogin(req.keyStore)
  }).send(res)
};

const logOut = async (req, res, next) => {
  new SuccessResponse({
    message: "logout User success !",
    metadata: await logout(req.keyStore)
  }).send(res)
};

const createNewUser = async (req, res, next) => {
  try {
    const data = await createUser(req.body)
    // res.json({
    //   message: "Registered OK",
    //   metadata: data.metadata,
    // })
    new CREATED({
      message: "Registered OK",
      metadata: data.metadata,
    }).send(res)
  } catch (error) {
    console.log(error)
    next(error)
  }
};

const getEditUser = async (req, res, next) => {
  let userId = req.params.id;
  try {
    const userEdit = await getDataUser(userId);
    return res.render("editCRUD.ejs", { updateUser: [userEdit.data] });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res, next) => {
  const { name, phone, role, id } = req.body;
  try {
    const dataEditUser = { name, phone, role, id }
    const userUpdate = await updateDataUser(dataEditUser);
    return res.status(201).json({
      StatusCode: userUpdate.StatusCode,
      message: userUpdate.message,
    });
  } catch (error) {
    console.error("Error Update user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res, next) => {
  let userId = req.params.id;
  try {
    const deleteUser = await deleteDataUser(userId);
    return res.status(201).json({
      StatusCode: deleteUser.StatusCode,
      message: deleteUser.message,
    });
  } catch (error) {
    console.error("Error Delete user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const registerUser = async (req, res, next) => {
  return res.render("createCrud.ejs");
};

const loginDisplay = async (req, res, next) => {
  return res.render("loginUser.ejs");
};

module.exports = {
  createNewUser,
  registerUser,
  homePage,
  getEditUser,
  updateUser,
  deleteUser,
  loginDisplay,
  login,
  logOut
};
