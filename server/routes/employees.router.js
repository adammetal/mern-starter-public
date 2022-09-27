const { Router } = require("express");
const EmployeeModel = require("../db/employee.model");
// const Router = require('express').Router;

const employeesRouter = new Router();

employeesRouter.use("/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch {
    return res.status(400).end("Bad request");
  }

  if (!employee) {
    return res.status(404).end("Not found");
  }

  req.employee = employee;

  next();
});

employeesRouter.get("/", async (req, res) => {
  const employees = await EmployeeModel.find();
  return res.json(employees);
});

employeesRouter.get("/:id", (req, res) => {
  return res.json(req.employee);
});

employeesRouter.post("/", async (req, res) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch {
    return res.status(400).end("Bad Request");
  }
});

employeesRouter.patch("/:id", async (req, res) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch {
    return res.status(400).end("Bad request");
  }
});

employeesRouter.delete("/:id", async (req, res) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch {
    return res.status(400).end("Bad request");
  }
});

module.exports = employeesRouter;
