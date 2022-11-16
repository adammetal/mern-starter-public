import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CatCreator = ({ onCatCreated }) => {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [img, setImg] = useState("");

	const fetchCat = () => {
		return fetch("https://api.thecatapi.com/v1/images/search")
			.then((res) => res.json())
			.then((res) => res[0].url)
			.then((img) => {
				setImg(img);
			});
	};

	useEffect(() => {
		fetchCat();
	}, []);

	return (
		<div>
			<input
				type="text"
				value={name}
				placeholder="Cat name"
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type="text"
				value={gender}
				placeholder="Cat Gender"
				onChange={(e) => setGender(e.target.value)}
			/>
			<input
				type="number"
				value={age}
				placeholder="Cat age"
				onChange={(e) => setAge(e.target.value)}
			/>
			<br />
			<img onClick={fetchCat} alt="" src={img} style={{ width: "500px" }} />
			<button
				onClick={() => {
					onCatCreated({ name, gender, img, age });
				}}
			>
				Save cat
			</button>
		</div>
	);
};

const EmployeeCats = () => {
	const params = useParams();
	const [employee, setEmployee] = useState();

	useEffect(() => {
		const load = async () => {
			const res = await fetch(`/api/employees/${params.uwu}`);
			const employee = await res.json();
			setEmployee(employee);
		};

		load();
	}, [params.uwu]);

	const handleCatCreated = (cat) => {
		console.log(cat);

		fetch(`/api/employees/${params.uwu}/cat`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cat),
		})
    .then((res) => res.json())
    .then((employee) => setEmployee(employee));
	};

	if (!employee) {
		return <h1>Loading...</h1>;
	}

	return (
		<div>
			<h1>{employee.name} Cats</h1>
			<div>
				{employee.cats.map((cat) => (
					<div key={cat._id}>
						<h2>{cat.name}</h2>
						<p>
							My cat is a {cat.gender} and {cat.age} years old
						</p>
						<img style={{ width: "300px" }} src={cat.img} alt="" />
					</div>
				))}
			</div>
			<h1>Add new cat</h1>
			<CatCreator onCatCreated={handleCatCreated} />
		</div>
	);
};

export default EmployeeCats;
