const express = require("express");
const { createDepartment, getDepartments, updateDepartment } = require("../controllers/departmentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/admin/department")
  .post(isAuthenticatedUser, authorizeRoles("admin"),createDepartment)
  .get(isAuthenticatedUser, authorizeRoles("admin"),getDepartments)
  
router.route("/admin/department/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateDepartment)
  
module.exports = router;

//
