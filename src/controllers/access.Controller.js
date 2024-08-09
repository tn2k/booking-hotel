const createHttpError = require("http-errors");
const { getAllUsers, createUser, getDataUser, updateDataUser, deleteDataUser } = require("../services/user.service");
const { OK, CREATED, SuccessResponse } = require("../core/success.response")
const { apiLogin, logout, handlerRefreshToken } = require("../services/access.service");



/**
 * handerRefreshToken 
 * logout 
 * login 
 * signup 
 * 
 */


const handlerRefreshToKen = async (req, res, next) => {
  new SuccessResponse({
    message: "Get token User success!",
    metadata: await handlerRefreshToken({
      refreshToken: req.refreshToken,
      user: req.user,
      keyStore: req.keyStore
    })
  }).send(res)
};

const logOut = async (req, res, next) => {
  new SuccessResponse({
    message: "logout User success !",
    metadata: await logout(req.keyStore)
  }).send(res)
};

const login = async (req, res, next) => {
  new SuccessResponse({
    message: "Logout User success!",
    metadata: await apiLogin(req.body)
  }).send(res)
};

const signUp = async (req, res, next) => {
  console.log('log 1')
  const data = await createUser(req.body)
  new CREATED({
    message: "Registered OK",
    metadata: data.metadata,
  }).send(res)
};

const getListUsers = async (req, res, next) => {
  new SuccessResponse({
    message: "Get list User success!",
    metadata: await handlerRefreshToken({
      refreshToken: req.refreshToken,
      user: req.user,
      keyStore: req.keyStore
    })
  }).send(res)
};

const getEditUser = async (req, res, next) => {
  let userId = req.params.id;
  new SuccessResponse({
    message: "Get data User edit success!",
    metadata: await getDataUser(userId)
  }).send(res)
};

const updateUser = async (req, res, next) => {
  new SuccessResponse({
    message: "Update data User edit success!",
    metadata: await updateDataUser(req.body)
  }).send(res)
};

const deleteUser = async (req, res, next) => {
  new SuccessResponse({
    message: "Delete User success!",
    metadata: await updateDataUser(req.params.id)
  }).send(res)
};



module.exports = {
  handlerRefreshToKen,
  login,
  logOut,
  signUp,
  getListUsers,
  getEditUser,
  updateUser,
  deleteUser,
};


// const getEditUsers = async (req, res, next) => {
//   let userId = req.params.id;
//   try {
//     const userEdit = await getDataUser(userId);
//     return res.render("editCRUD.ejs", { updateUser: [userEdit.data] });
//   } catch (error) {
//     console.error("Error retrieving user:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// };

// const deleteUser = async (req, res, next) => {
//   let userId = req.params.id;
//   try {
//     const deleteUser = await deleteDataUser(userId);
//     return res.status(201).json({
//       StatusCode: deleteUser.StatusCode,
//       message: deleteUser.message,
//     });
//   } catch (error) {
//     console.error("Error Delete user:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// };
