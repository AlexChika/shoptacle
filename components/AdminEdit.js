import React, { useState } from "react";
import { Store } from "../store/Context";
import { AdminStore } from "../pages/admin";
import styled from "styled-components";
import Modal from "./Modal";
import { ADMIN_REFRESH_STATE } from "../store/actionTypes";
import { Validate } from "../utils/functions";
import { _category } from "../utils/data";
import { updateProduct, uploadImage } from "../utils/firebase";

const AdminEdit = () => {
  const { editId, products, dispatch } = AdminStore();
  const { Logger, user, isAdmin } = Store();
  // local state
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState(editId);
  const [editProduct, setEditProduct] = useState(null);
  const [formInput, setFormInput] = useState({
    name: { value: "", valid: false },
    collection: { value: "", valid: false },
    arrival: { value: "", valid: false },
    price: { value: "", valid: false },
    quantity: { value: "", valid: false },
    brand: { value: "", valid: false },
    category: { value: "", valid: false },
    desc: { value: "", valid: false },
  });

  // update input fields to contain product details to be edited
  function fillForms(product) {
    setFormInput({
      name: { value: product.name, valid: true },
      collection: { value: product.collection, valid: true },
      arrival: { value: product.arrival, valid: true },
      price: { value: Number(product.price) / 100, valid: true },
      quantity: { value: Number(product.quantity), valid: true },
      brand: { value: product.brand, valid: true },
      category: { value: product.category, valid: true },
      desc: { value: product.desc, valid: true },
    });
    setCategory(_category[product.collection]);
    document.querySelectorAll(".editForm .status").forEach((el) => {
      el.textContent = "";
    });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const product = products.find((item) => item.id === searchValue);
    if (product) {
      setEditProduct(product);
      fillForms(product);
    } else {
      setEditProduct("");
      Logger("Product not found or Id is incorrect", "error");
    }
  };

  // inputs onChange handler
  const validate = new Validate();
  function inputsOnchange(e) {
    // helper func to update inputs state
    function updateState(name, status) {
      const { valid, value } = status;
      setFormInput({
        ...formInput,
        [name]: { ...formInput[name], valid, value },
      });
    }

    // logs invalid input errot to ui
    function logError(status, el) {
      const { valid, msg } = status;
      if (valid) {
        el.textContent = "";
      } else {
        el.textContent = msg;
      }
    }

    const name = e.target.name;
    let value = e.target.value;
    let status;
    const statusEl = document.querySelector(`[data-id=${name}]`);

    if (name == "name") {
      status = validate.text(value, 5, ...[,], "Name");
    }
    if (name == "collection") {
      status = validate.text(value, ...[,], ...[,], "Collection");
    }
    if (name == "arrival") {
      status = validate.text(value, ...[,], ...[,], "Arrival");
    }
    if (name == "price") {
      value = parseInt(value);
      status = validate.number(value, 100, ...[,], "Price in Naira");
    }
    if (name == "quantity") {
      value = parseInt(value);
      status = validate.number(value, 0, ...[,], "Quantity");
    }
    if (name == "brand") {
      status = validate.text(value, ...[,], ...[,], "Brand");
    }
    if (name == "category") {
      status = validate.text(value, ...[,], ...[,], "Category");
    }
    if (name == "desc") {
      status = validate.text(value, 100, ...[,], "Detail");
    }
    updateState(name, { ...status, value });
    logError(status, statusEl);
  }

  async function handleEditProduct(e) {
    e.preventDefault();
    if (!editProduct)
      return Logger("Product not found or Id is incorrect", "error");

    //  check to see if all input is valid
    for (const key in formInput) {
      if (formInput[key].valid == false) {
        Logger("Invalid entries, Please try again", "error");
        return;
      }
    }

    // check to see if user is an admin
    if (!isAdmin) {
      setModal(true);
      return;
    }

    try {
      setLoading(true);
      const productData = {
        name: formInput.name.value,
        collection: formInput.collection.value,
        arrival: formInput.arrival.value,
        price: formInput.price.value * 100,
        quantity: formInput.quantity.value,
        brand: formInput.brand.value,
        category: formInput.category.value,
        desc: formInput.desc.value,
      };
      const snapshot = await updateProduct(editProduct.id, productData);
      setFormInput({
        name: { value: "", valid: false },
        collection: { value: "", valid: false },
        arrival: { value: "", valid: false },
        price: { value: "", valid: false },
        quantity: { value: "", valid: false },
        brand: { value: "", valid: false },
        category: { value: "", valid: false },
        desc: { value: "", valid: false },
      });
      setLoading(false);
      Logger("Product was Edited succefully", "success");
      dispatch({ type: ADMIN_REFRESH_STATE });
    } catch (error) {
      setLoading(true);
      Logger("There was an error, Please try again", "error");
    }
  }

  async function uploadImages(e) {
    e.preventDefault();

    if (!editProduct)
      return Logger("Product not found or Id is incorrect", "error");

    const form = e.target;
    const inputEl = form.querySelector("input");
    const inputName = inputEl.name;
    const file = inputEl.files[0];

    if (!file) {
      Logger(`You have not selected any file at ${inputName}`, "error");
      return;
    }

    if (!file.type.match("image.*")) {
      Logger(`Only Image Uploads is allowed at ${inputName}`, "error");
      return;
    }

    // check to see if user is an admin
    if (!isAdmin) {
      setModal(true);
      return;
    }

    // convert name to pascal
    let pascalName;
    switch (inputName) {
      case "image one":
        pascalName = "imgOne";
        break;
      case "image two":
        pascalName = "imgTwo";
        break;
      case "image three":
        pascalName = "imgThree";
        break;
      case "image four":
        pascalName = "imgFour";
        break;
      default:
        throw new Error("Error image name type");
    }

    const filePath = `products/${formInput.name.value}/${pascalName}`;

    try {
      setLoading(true);
      const url = await uploadImage(file, filePath);
      const snapshot = await updateProduct(editProduct.id, {
        [pascalName]: url,
      });
      Logger("Image was uploaded successfully", "success");
      setLoading(false);
      form.reset();
    } catch (error) {
      setLoading(false);
      Logger(`Image Upload failed at ${inputName}`, "error");
    }
  }

  return (
    <Wrapper className="opacity center">
      <h1 className="title mt20">Edit Products</h1>

      <form onSubmit={handleSearch} className="form f center mt20">
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="Search product by Ids"
          type="text"
          name=""
          id=""
        />
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={handleEditProduct} className="editForm center mt30">
        <div className="fullwrap">
          <div className="formInput f mt10">
            <label htmlFor="name">Name</label>
            <input
              onChange={inputsOnchange}
              value={formInput.name.value}
              name="name"
              type="text"
              id="name"
              placeholder="Enter product name"
            />
          </div>
          <p data-id="name" className="status"></p>
        </div>

        <div className="fullwrap">
          <div className="formInput f">
            <label htmlFor="collection">Collection</label>
            <select
              value={formInput.collection.value}
              onChange={(e) => {
                inputsOnchange(e);
                setCategory(_category[e.target.value]);
              }}
              name="collection"
              id="collection"
            >
              <option disabled value="">
                Select a collection
              </option>
              <option value="Male Fashion">Male Fashion</option>
              <option value="Female Fashion">Female Fashion</option>
              <option value="Unisex Shoes">Unisex Shoes</option>
              <option value="Smart Gadgets">Smart Gadgets</option>
            </select>
          </div>
          <p data-id="collection" className="status"></p>
        </div>

        <div className="fullwrap">
          <div className="formInput f">
            <label htmlFor="featured">Arrival</label>
            <select
              value={formInput.arrival.value}
              onChange={(e) => {
                inputsOnchange(e);
              }}
              name="arrival"
              id="arrival"
            >
              <option disabled value="">
                Select a action
              </option>
              <option value="New Arrival">New Arrival</option>
              <option value="Not New Arrival">Not New Arrival</option>
            </select>
          </div>
          <p data-id="arrival" className="status"></p>
        </div>

        <span className="f j-between">
          <div className="halfwrap">
            <div className="formInput f">
              <label htmlFor="price">Price</label>
              <input
                onChange={inputsOnchange}
                value={formInput.price.value}
                name="price"
                type="number"
                id="price"
                placeholder="Enter price in Naira"
              />
            </div>
            <p data-id="price" className="status"></p>
          </div>
          <div className="halfwrap">
            <div className="formInput f">
              <label htmlFor="quantity">Quantity</label>
              <input
                onChange={inputsOnchange}
                value={formInput.quantity.value}
                name="quantity"
                type="number"
                id="quantity"
                placeholder="Enter item Quantity"
              />
            </div>
            <p data-id="quantity" className="status"></p>
          </div>
        </span>

        <span className="f j-between">
          <div className="halfwrap">
            <div className="formInput f mt10">
              <label htmlFor="brand">Brand</label>
              <input
                onChange={inputsOnchange}
                value={formInput.brand.value}
                name="brand"
                type="text"
                id="brand"
                placeholder="Eg samsung"
              />
            </div>
            <p data-id="brand" className="status"></p>
          </div>
          <div className="halfwrap">
            <div className="formInput f mt10">
              <label htmlFor="category">Category</label>
              <select
                onChange={inputsOnchange}
                value={formInput.category.value}
                name="category"
                id="category"
              >
                <option disabled value="">
                  Select a category
                </option>
                {category.map((category, index) => {
                  return (
                    <option className="capitalize" key={index} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <p data-id="category" className="status"></p>
          </div>
        </span>

        <div className="fullwrap">
          <textarea
            onChange={inputsOnchange}
            value={formInput.desc.value}
            placeholder="Enter product detail"
            name="desc"
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <p data-id="desc" className="status"></p>
        </div>

        <div className="image">
          <img data-id="image" src="" alt="product image" />
        </div>

        <div className={`spinner mt20 center ${loading ? "" : "stop"}`}></div>

        <div className="fullwrap mt10">
          <button type="submit">EDIT PRODUCT</button>
        </div>
      </form>

      {/* optional for image uploads */}
      <h2 className="mt30">OPTIONAL</h2>
      <form onSubmit={uploadImages} className="form f center mt20">
        <input accept="image/*" type="file" name="image one" />
        <button type="submit">Image One</button>
      </form>
      <form onSubmit={uploadImages} className="form f center mt20">
        <input accept="image/*" type="file" name="image two" />
        <button type="submit">Image Two</button>
      </form>
      <form onSubmit={uploadImages} className="form f center mt20">
        <input accept="image/*" type="file" name="image three" />
        <button type="submit">Image Three</button>
      </form>
      <form onSubmit={uploadImages} className="form f center mt20">
        <input accept="image/*" type="file" name="image four" />
        <button type="submit">Image Four</button>
      </form>

      <Modal modal={modal} setModal={setModal}>
        <section className="modal">
          <h1 className="mt20 capitalize">Hello {user.firstName}</h1>
          <p className="mt10">
            You are not an admin and cannot make changes to SHOPTACLE
          </p>

          <h4 className="mt10">
            However, if you wish to make Edits and add Products to SHOPTACE or
            to Test the app, please send a mail to &nbsp;
            <a href="mailto:i.am.alex.chika@gmail.com">
              i.am.alex.chika@gmail.com
            </a>{" "}
            &nbsp; for Admin access using your registered email
          </h4>
          <h3 className="mt10">OR</h3>
          <small className="mt10">Submit the below form</small>
          <form
            action="https://formspree.io/f/xbjbdqbl"
            method="post"
            className="f mt10"
          >
            <input
              defaultValue={user.email}
              required
              type="email"
              name="Email"
              id=""
            />
            <button type="submit">Submit</button>
          </form>
          <small>
            Once we recieve your email, you will be notified as soon as you now
            have admin access
          </small>
        </section>
      </Modal>
    </Wrapper>
  );
};

export default AdminEdit;
const Wrapper = styled.main`
  max-width: 1170px;
  color: var(--blue);
  padding-bottom: 30px;
  text-align: center;
  .title {
    text-align: center;
  }

  .form {
    max-width: 600px;
    input {
      border: 2px solid var(--blue);
      flex: 0.7;
      padding: 10px;
      font-size: 16px;
    }
    button {
      background-color: var(--blue);
      color: white;
      flex: 0.3;
      border-radius: 0;
    }
  }

  form {
    max-width: 600px;

    span {
      flex-wrap: wrap;
    }
    .fullwrap {
      margin-bottom: 25px;
    }
    .halfwrap {
      width: 100%;
      margin-bottom: 25px;
    }

    .formInput {
      width: 100%;
      height: 40px;

      label,
      input,
      select {
        border: 1px solid gray;
        font-size: 16px;
        display: flex;
        align-items: center;
      }

      label {
        padding: 0px 20px;
        height: 100%;
        min-width: 7em;
        max-width: 7em;
      }

      input,
      select {
        padding: 0px 15px;
        width: 100%;
      }

      input[type="file"] {
        padding: 5px;
      }
    }

    .status {
      color: red;
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      min-height: 200px;
      max-height: 200px;
      border: 1px solid gray;
      font-size: 16px;
      padding: 10px;
    }

    .image {
      margin-bottom: 25px;
      display: none;
      img {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: fill;
      }
    }

    button {
      background-color: var(--blue);
      width: 100%;
      padding: 10px;
      color: white;
      border-radius: 10px;
    }
  }

  .modal {
    color: var(--blue);
    text-align: center;
    h1 {
    }

    p {
      color: tomato;
    }
    a {
      text-decoration: underline teal;
    }
    form {
      width: 100%;
    }
    input {
      flex: 0.65;
      padding: 10px;
      background-color: white;
    }
    button {
      color: white;
      flex: 0.35;
      background-color: var(--blue);
      padding: 10px;
      border-radius: 0;
    }
  }

  @media screen and (min-width: 600px) {
    form {
      .halfwrap {
        width: 48%;
      }
    }
  }
`;
