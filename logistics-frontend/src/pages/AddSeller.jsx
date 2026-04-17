import { useState } from "react";
import axios from "axios";

function AddSeller() {

  const [formData, setFormData] = useState({
    sellerName: "",
    sellerEmail: "",
    sellerCompany: "",
    productName: "",
    productPrice: "",
    buyerName: "",
    buyerEmail: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/full-order", formData);

      alert("Complete Order Created Successfully!");

      setFormData({
        sellerName: "",
        sellerEmail: "",
        sellerCompany: "",
        productName: "",
        productPrice: "",
        buyerName: "",
        buyerEmail: ""
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Add Seller & Order Details</h1>

      <form onSubmit={handleSubmit}>

        <h3>Seller Details</h3>
        <input name="sellerName" placeholder="Seller Name" value={formData.sellerName} onChange={handleChange} required />
        <br /><br />
        <input name="sellerEmail" placeholder="Seller Email" value={formData.sellerEmail} onChange={handleChange} required />
        <br /><br />
        <input name="sellerCompany" placeholder="Company Name" value={formData.sellerCompany} onChange={handleChange} required />

        <hr />

        <h3>Product Details</h3>
        <input name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} required />
        <br /><br />
        <input name="productPrice" placeholder="Product Price" value={formData.productPrice} onChange={handleChange} required />

        <hr />

        <h3>Buyer Details</h3>
        <input name="buyerName" placeholder="Buyer Name" value={formData.buyerName} onChange={handleChange} required />
        <br /><br />
        <input name="buyerEmail" placeholder="Buyer Email" value={formData.buyerEmail} onChange={handleChange} required />

        <br /><br />
        <button type="submit">Create Complete Order</button>
      </form>
    </div>
  );
}

export default AddSeller;