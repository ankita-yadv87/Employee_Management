const ErrorHandler = require("../services/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Employee = require("../models/employeeModel");
const sendToken = require("../services/jwtToken");
const ApiFeatures = require("../services/apifeatures");

//employee signup
exports.signUp = catchAsyncErrors(async (req, res, next) => {
  try {
    
    const { name, email, password, location, role, department } = req.body;

    const employee = await Employee.create({
      name,
      email,
      password,
      location,
      department,
      role
    });

    const token = employee.getJWTToken();
    
    res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    // Log the error or handle it appropriately
    console.error(error);
    next(new ErrorHandler(error.message, 500)); // Send a 500 Internal Server Error
  }
});

//employee login
exports.loginEmployee = catchAsyncErrors(async (req, res, next) => {

  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const employee = await Employee.findOne({ email }).select("+password");

  if (!employee) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await employee.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(employee, 200, res);
});

//employee Logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get Employee Detail
exports.getEmployeeDetail = catchAsyncErrors(async (req, res, next) => {
  console.log("req.user",req.user)
  const employee = await Employee.findById(req.user.id);

  res.status(200).json({
    success: true,
    employee,
  });
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

  const {name, email, location, department, role} = req.body;
  const newUserData = {
    name,
    email, 
    location,
    department,
    role
  };

  const employee = await Employee.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message:"updated profile successfully",
  });
});

// Get all Employee(admin)
exports.getAllEmployees = catchAsyncErrors(async (req, res, next) => {
  // const employees = await Employee.find();
  console.log("REQ",req.query)
  const resultPerPage = 8;
  const employeeCount = await Employee.countDocuments();

  const apiFeature = new ApiFeatures(Employee.find(), req.query)
    .search()
    .filter().pagination(resultPerPage);

  let employee = await apiFeature.query;

  let filteredEmployeesCount = employee.length;

  res.status(200).json({
    success: true,
    employee,
  });
});

// Get single Employee (admin)
exports.getSingleEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    employee,
  });
});

// update Employee Role -- Admin
exports.updateEmployee = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    location: req.body.location,
    department: req.body.department,
  };

  await Employee.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message:"updated successfully"
  });
});

// Delete employee --Admin
exports.deleteEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(
      new ErrorHandler(`Employee does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await employee.deleteOne()

  res.status(200).json({
    success: true,
    message: "Employee Deleted Successfully",
  });
});
