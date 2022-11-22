import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (signal, order) => {
	return fetch(
		`/api/employees?sort=${order.order}&dir=${order.dir ? "asc" : "desc"}`,
		{ signal },
	).then((res) => res.json());
};

const deleteEmployee = (id) => {
	return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
		res.json(),
	);
};

const EmployeeList = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [order, setOrder] = useState("created");
	const [dir, setDir] = useState(false);

	const handleDelete = (id) => {
		deleteEmployee(id).catch((err) => {
			console.log(err);
		});

		setData((employees) => {
			return employees.filter((employee) => employee._id !== id);
		});
	};

	const sort = (by) => {
		setOrder(by);
		setDir((dir) => !dir);

		/*fetch(`/api/employees?sort=${by}&dir=${dir}`)
      .then((res) => res.json())
      .then((employees) => {
        setData(employees);
      })*/
	};

	useEffect(() => {
		const controller = new AbortController();

		fetchEmployees(controller.signal, { dir, order })
			.then((employees) => {
				setLoading(false);
				setData(employees);
			})
			.catch((error) => {
				if (error.name !== "AbortError") {
					setData(null);
					throw error;
				}
			});

		return () => controller.abort();
	}, [dir, order]);

	if (loading) {
		return <Loading />;
	}

	return (
		<EmployeeTable order={order} onSort={sort} employees={data} onDelete={handleDelete} />
	);
};

export default EmployeeList;
