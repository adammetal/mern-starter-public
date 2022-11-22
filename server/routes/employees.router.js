const { Router } = require("express");
const EmployeeModel = require("../db/employee.model");

const employeesRouter = new Router();

employeesRouter.use("/:id", async (req, res, next) => {
	let employee = null;

	try {
		employee = await EmployeeModel.findById(req.params.id);

		if (!employee) {
			return res.status(404).end("Employee not found");
		}
	} catch {
		return res.status(400).end("Bad request");
	}

	req.employee = employee;
	next();
});

// GET /api/employees
employeesRouter.get("/", async (req, res) => {
	const { query } = req;

	const filter = {};
	const sort = {};

	if (query.codRank) {
		filter.codRank = query.codRank;
	}

	if (query.name) {
		filter.name = { $regex: query.name, $options: "i" };
	}

	if (query.position) {
		filter.position = position;
	}

  if (query.sort) {
    sort[query.sort] = query.dir;
  } else {
    sort.created = 'desc';
  }

	const employees = await EmployeeModel.find(filter).sort(sort);
	return res.json(employees);
});

employeesRouter.get("/:id", (req, res) => {
	return res.json(req.employee);
});

employeesRouter.post("/", async (req, res, next) => {
	const employee = req.body;

	try {
		const saved = await EmployeeModel.create(employee);
		return res.json(saved);
	} catch (err) {
		return next(err);
	}
});

employeesRouter.patch("/:id", async (req, res, next) => {
	const employee = req.body;

	try {
		const updated = await req.employee.set(employee).save();
		return res.json(updated);
	} catch (err) {
		return next(err);
	}
});

employeesRouter.delete("/:id", async (req, res, next) => {
	try {
		const deleted = await req.employee.delete();
		return res.json(deleted);
	} catch (err) {
		return next(err);
	}
});

module.exports = employeesRouter;
