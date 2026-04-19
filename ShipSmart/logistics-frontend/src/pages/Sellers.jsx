import { useState, useEffect } from "react";
import axios from "axios";

function Sellers() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: ""
  });

  const [sellers, setSellers] = useState([]);

  // Load sellers on page load
  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sellers");
      setSellers(res.data);
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/sellers", formData);

      alert("Seller Added Successfully!");

      setFormData({
        name: "",
        email: "",
        company: ""
      });

      fetchSellers(); // refresh list
    } catch (error) {
      console.error("Error adding seller:", error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Add Seller</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Seller Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <input
            type="email"
            name="email"
            placeholder="Seller Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit" style={{ padding: "8px 16px" }}>
          Submit Seller
        </button>
      </form>

      <hr style={{ margin: "40px 0" }} />

      <h2>Seller List</h2>

      {sellers.length === 0 ? (
        <p>No sellers added yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller._id}>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>{seller.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Sellers;