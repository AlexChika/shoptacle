import React, { useState } from "react";
import styled from "styled-components";
import { Store } from "../store/Context";
import { Validate } from "../utils/functions";
import Modal from "./Modal";

// firebase imports
import { addProduct, uploadImage } from "../utils/firebase";
// app
const AdminAdd = () => {
  const { Logger, isAdmin, user } = Store();
  const validate = new Validate();

  // states
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    name: { value: "", valid: false },
    collection: { value: "", valid: false },
    price: { value: "", valid: false },
    quantity: { value: "", valid: false },
    brand: { value: "", valid: false },
    category: { value: "", valid: false },
    desc: { value: "", valid: false },
    mainUrl: { value: "", valid: false },
  });

  // local funcs
  // logs invalid input errot to ui
  function logError(status, el) {
    const { valid, msg } = status;
    if (valid) {
      el.textContent = "";
    } else {
      el.textContent = msg;
    }
  }
  // helper func to update inputs state
  function updateState(name, status) {
    const { valid, value } = status;
    setFormInput({
      ...formInput,
      [name]: { ...formInput[name], valid, value },
    });
  }
  // inputs onChange handler
  function inputsOnchange(e) {
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
    if (name == "price") {
      value = Number(value);
      status = validate.number(value, 100, ...[,], "Price in Kobo");
    }
    if (name == "quantity") {
      value = Number(value);
      status = validate.number(value, 1, ...[,], "Quantity");
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
    if (name == "mainUrl") {
      const file = e.target.files[0];
      const image = document.querySelector(`[data-id=image]`);
      image.style.display = "none";
      // check if file exists
      if (!file) {
        status = {
          msg: "No images detected",
          valid: false,
        };
        value = "";
        image.setAttribute("src", "");
      } else {
        // Check if the file is an image.
        if (!file.type.match("image.*")) {
          status = {
            msg: "Only Image Uploads is allowed",
            valid: false,
          };
          value = "";
          image.setAttribute("src", "");
        } else {
          value = file;
          status = {
            valid: true,
            msg: "Image is Valid",
          };
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.addEventListener("load", function () {
            image.setAttribute("src", this.result);
            image.style.display = "block";
          });
        }
      }
    }

    updateState(name, { ...status, value });
    logError(status, statusEl);
  }

  async function handleAddProduct(e) {
    e.preventDefault();

    // check if all inputs are valid
    for (const key in formInput) {
      if (formInput[key].valid == false) {
        Logger("Invalid entries, Please try again", "error");
        return;
      }
    }

    if (!isAdmin) {
      setModal(true);
      return;
    }

    try {
      setLoading(true);
      const name = formInput.name.value;
      const file = formInput.mainUrl.value;
      const filePath = `products/${name}/imgone`;
      const url = await uploadImage(file, filePath);
      const productData = {
        name: formInput.name.value,
        collection: formInput.collection.value,
        price: formInput.price.value,
        quantity: formInput.quantity.value,
        brand: formInput.brand.value,
        category: formInput.category.value,
        desc: formInput.desc.value,
        mainUrl: url,
        images: [],
        rating: {
          five: 0,
          four: 0,
          three: 0,
          two: 0,
          one: 0,
        },
      };
      const snapshot = await addProduct(productData);
      document.querySelector("[data-id = image]").style.display = "none";
      setFormInput({
        name: { value: "", valid: false },
        collection: { value: "", valid: false },
        price: { value: "", valid: false },
        quantity: { value: "", valid: false },
        brand: { value: "", valid: false },
        category: { value: "", valid: false },
        desc: { value: "", valid: false },
        mainUrl: { value: "", valid: false },
      });
      setLoading(false);
      Logger("Product was added succefully", "success");
    } catch (error) {
      setLoading(true);
      Logger("There was an error, Please try again", "error");
    }
  }

  return (
    <Wrapper className="opacity center">
      <h1 className="title mt20">Add Products</h1>

      <form onSubmit={handleAddProduct} className="center mt30">
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
              onChange={inputsOnchange}
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
                placeholder="Enter price in kobo"
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
              <input
                onChange={inputsOnchange}
                value={formInput.category.value}
                name="category"
                type="text"
                id="category"
                placeholder="Eg Men Suits"
              />
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

        <div className="fullwrap">
          <div className="formInput f">
            <label htmlFor="image">Image</label>
            <input
              onChange={inputsOnchange}
              accept="image/*"
              type="file"
              name="mainUrl"
              id="image"
            />
          </div>
          <p data-id="mainUrl" className="status"></p>
        </div>

        <div className={`spinner mt20 center ${loading ? "" : "stop"}`}></div>

        <div className="fullwrap mt10">
          <button type="submit">ADD PRODUCT</button>
        </div>
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

export default AdminAdd;
const Wrapper = styled.main`
  max-width: 1170px;
  color: var(--blue);
  padding-bottom: 30px;

  .title {
    text-align: center;
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
      img {
        display: none;
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
    h3 {
      color: orange;
    }
    h4 {
      color: skyblue;
    }
    p {
      color: tomato;
    }
    a {
      text-decoration: underline;
      color: teal;
    }
    form {
      width: 100%;
    }
    input {
      width: 65%;
      padding: 10px;
      background-color: white;
    }
    button {
      color: white;
      width: 35%;

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
