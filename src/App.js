import React, { useState, useEffect } from "react";
import "./App.css";

// Initial employee data
const initialEmployees = [
  { name: "Sava", department: "IT", role: "Senior Web Developer" },
  { name: "Saba", department: "IT", role: "Web Developer" },
  { name: "Irakli", department: "HR", role: "Manager" },
];

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    role: "",
  });
  const [viewMode, setViewMode] = useState("list");

  // Load from localStorage on mount
  useEffect(() => {
    const savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  // Save to localStorage when employees change
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.department) {
      alert("Name and Department are required!");
      return;
    }
    setEmployees([...employees, newEmployee]);
    setNewEmployee({ name: "", department: "", role: "" });
  };

  const displayList = () => {
    return employees.map((emp, index) => (
      <li key={index}>{`${emp.name} - ${emp.department} - ${emp.role}`}</li>
    ));
  };

  const displaySorted = () => {
    const sorted = [...employees].sort((a, b) => a.name.localeCompare(b.name));
    return sorted.map((emp, index) => (
      <li key={index}>{`${emp.name} - ${emp.department} - ${emp.role}`}</li>
    ));
  };

  const displaySearch = () => {
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered.length > 0 ? (
      filtered.map((emp, index) => (
        <li key={index}>{`${emp.name} - ${emp.department} - ${emp.role}`}</li>
      ))
    ) : (
      <li>No match found</li>
    );
  };

  const displayFiltered = () => {
    const filtered = employees.filter((emp) =>
      emp.department.toLowerCase().includes(filterDept.toLowerCase())
    );
    return filtered.length > 0 ? (
      filtered.map((emp, index) => (
        <li key={index}>{`${emp.name} - ${emp.department} - ${emp.role}`}</li>
      ))
    ) : (
      <li>No employees in this department</li>
    );
  };

  return (
    <div className="App">
      <h1>Employee Management Tool</h1>

      <div className="controls">
        <button
          onClick={() => {
            setViewMode("list");
            setSearchTerm("");
            setFilterDept("");
          }}
        >
          List
        </button>

        <button
          onClick={() => {
            setViewMode("sort");
            setSearchTerm("");
            setFilterDept("");
          }}
        >
          Sort
        </button>

        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setViewMode("search");
            setFilterDept("");
          }}
          placeholder="Search by name"
        />

        <input
          value={filterDept}
          onChange={(e) => {
            setFilterDept(e.target.value);
            setViewMode("filter");
            setSearchTerm("");
          }}
          placeholder="Filter by department"
        />
      </div>

      <div className="add-employee">
        <h2>Add New Employee</h2>
        <form onSubmit={handleAddEmployee}>
          <input
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            placeholder="Name"
          />
          <input
            value={newEmployee.department}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, department: e.target.value })
            }
            placeholder="Department"
          />
          <input
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, role: e.target.value })
            }
            placeholder="Role"
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="results">
        <h2>Employees</h2>
        <ul>
          {viewMode === "search" && searchTerm
            ? displaySearch()
            : viewMode === "filter" && filterDept
            ? displayFiltered()
            : viewMode === "sort"
            ? displaySorted()
            : displayList()}
        </ul>
      </div>
    </div>
  );
}

export default App;
