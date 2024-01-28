const ErrorHandler = require("../services/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Department = require("../models/departmentModel");

exports.createDepartment = catchAsyncErrors(async (req, res, next) => {
    try {
      
      const { name, manager } = req.body;
  
      const emp = await department.create({
        name,
        manager
      });
      
      res.status(201).json({
        success: true,
      });
    } catch (error) {
      // Log the error or handle it appropriately
      console.error(error);
      next(new ErrorHandler(error.message, 500)); // Send a 500 Internal Server Error
    }
  });
  
// Get all departments(admin)
exports.getDepartments = catchAsyncErrors(async (req, res, next) => {
    const department = await Department.find();
  
    res.status(200).json({
      success: true,
      department,
    });
  });

  // update Department -- Admin
exports.updateDepartment = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      manager: req.body.manager
    };
  
    await Department.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      message:"updated successfully"
    });
  });


  // Delete department --Admin
exports.deleteDepartment = catchAsyncErrors(async (req, res, next) => {
    const department = await Department.findById(req.params.id);
  
    if (!department) {
      return next(
        new ErrorHandler(`Department does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    await department.deleteOne()
  
    res.status(200).json({
      success: true,
      message: "Department Deleted Successfully",
    });
  });