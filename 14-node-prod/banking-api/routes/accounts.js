const express = require("express");
const {
    getAllAccounts,
    getSingleAccount,
    createAccount,
    updateAccount,
    deleteAccount,
} = require("../controllers/accountsController");

const router = express.Router();

router.route("/accounts").get(getAllAccounts).post(createAccount);

router.route("/accounts/:id").get(getSingleAccount).put(updateAccount).delete(deleteAccount);

module.exports = router;

