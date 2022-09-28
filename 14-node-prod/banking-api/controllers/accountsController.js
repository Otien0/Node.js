const Account = require('../models/accountsModel');
catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.getAllAccounts = catchAsyncErrors(async (req, res, next) => {
  const accounts = await Account.find();

  res.status(200).json({
    success: true,
    count: accounts.length,
    data: accounts,
  });
});

exports.getAccount = catchAsyncErrors(async (req, res, next) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    return next(
      new ErrorHandler(`Account not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: account,
  });
});

exports.createAccount = catchAsyncErrors(async (req, res, next) => {
  const account = await Account.create(req.body);

  res.status(201).json({
    success: true,
    data: account,
  });
});

exports.updateAccount = catchAsyncErrors(async (req, res, next) => {
  const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!account) {
    return next(
      new ErrorHandler(`Account not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: account,
  });
});

exports.deleteAccount = catchAsyncErrors(async (req, res, next) => {
  const account = await Account.findByIdAndDelete(req.params.id);

  if (!account) {
    return next(
      new ErrorHandler(`Account not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
