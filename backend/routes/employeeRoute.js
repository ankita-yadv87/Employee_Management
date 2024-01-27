const express = require("express");
const {
  signUp,
  loginEmployee,
  logout,
  getEmployeeDetail,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees
} = require("../controllers/employeeController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/signup").post(signUp);

router.route("/login").post(loginEmployee);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getEmployeeDetail);


router.route("/admin/employees").get(isAuthenticatedUser, authorizeRoles("admin"), getAllEmployees);

router
  .route("/admin/employee/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleEmployee)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateEmployee)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEmployee);

module.exports = router;
