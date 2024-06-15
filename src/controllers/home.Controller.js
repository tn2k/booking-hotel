const createHttpError = require("http-errors");
const { getAllUsers, createUser, getDataUser, updateDataUser, deleteDataUser } = require("../services/user.service");


const homePage = async (req, res, next) => {
  try {
    let data = await getAllUsers();
    return res.render("displayCRUD.ejs", { listUsers: data.data });
  } catch (error) {
    console.error(error)
    next(error)
  }
};

const createNewUser = async (req, res, next) => {
  const { name, password, email, phone, role } =
    req.body;
  const userData = { name, password, email, phone, role }
  try {
    let newUser = await createUser(userData);
    return res.status(201).json({
      EC: newUser.EC,
      EM: newUser.EM,
    });
  } catch (error) {
    console.error(error);
    next(error)
  }
};

const registerUser = async (req, res, next) => {
  return res.render("createCrud.ejs");
};

const login = async (req, res, next) => {
  return res.render("loginUser.ejs");
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
      EC: userUpdate.EC,
      EM: userUpdate.EM,
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
      EC: deleteUser.EC,
      EM: deleteUser.EM,
    });
  } catch (error) {
    console.error("Error Delete user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createNewUser,
  registerUser,
  homePage,
  getEditUser,
  updateUser,
  deleteUser,
  login,
};
