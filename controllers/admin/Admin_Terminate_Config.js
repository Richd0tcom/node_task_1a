"use strict";

const app = require("express").Router();
let SessionService = require("../../services/SessionService");
const ValidationService = require("../../services/ValidationService");
const db = require("../../models");
const helpers = require("../../core/helpers");

const role = 1;

app.get("/admin/terminateConfig/", SessionService.verifySessionMiddleware(role, "admin"), async function (req, res, next) {
  try {
    let session = req.session;
    let paginateListViewModel = require("../../view_models/terminate_config_view_model");

    var viewModel = new paginateListViewModel(db.terminateconfig, "Terminate message setting", session.success, session.error, "/admin/terminateConfig");

    viewModel._column = ["ID", "Message", "Counter"];
    viewModel._readable_column = ["ID", "Message", "Counter"];

    
    const flashMessageSuccess = req.flash("success");
    if (flashMessageSuccess && flashMessageSuccess.length > 0) {
      viewModel.success = flashMessageSuccess[0];
    }
    const flashMessageError = req.flash("error");
    if (flashMessageError && flashMessageError.length > 0) {
      viewModel.error = flashMessageError[0];
    }

    viewModel.set_id("1");
    

    let where = helpers.filterEmptyFields({
      id: viewModel.get_id(),
      name: viewModel.get_message(),
    });

    viewModel.set_total_rows(1);

    const list = await db.terminateconfig.getMessage();
    viewModel.set_message(list.message || 'something went wrong');
    viewModel.set_counter(list.counter);
    console.log('---',list.message)
    viewModel.set_list(list);
    console.log('\n--->',viewModel.get_counter())

    return res.render("admin/terminateConfig", viewModel);
  } catch (error) {
    console.error(error);
    viewModel.error = error.message || "Something went wrong";
    return res.render("admin/terminateConfig", viewModel);
  }
});


// API
app.get("/api/v1/terminatequiz", async function (req, res, next) {
    try {
        const msg = await db.terminateconfig.getAll();
        if(!msg){
          res.status(404).json({status:"failed", message: "There are no messages"})
          return
        }
    
        return res.status(200).json({ status: "success", message: msg[0] });
    
      } catch (error) {
        
        console.error(error);
        console.log(error.message)
        return res.status(500).json({ status: "failed", message:"Something went wrong" });
      }
});
app.post("/api/v1/terminatequiz", async  (req, res, next) =>{
  try {
    const terminateObj = {...req.body}
    const ress = await db.terminateconfig.updatee(terminateObj);

    return res.status(200).json({ status: "success"})
  } catch (error) {
    res.status = 500
    res.json({ success: false, message: error })
    return res;
  }
});
module.exports = app;