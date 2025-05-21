import React, { useState } from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import { AdminStore } from "./adminStore";
import { Validate } from "utils/functions";
import Modal from "./ModalHoc";
import { ADMIN_REFRESH_STATE } from "store/actionTypes";
import { _category } from "utils/data";

// firebase imports
import { addProduct, uploadImage } from "utils/firebase";
import NotAnAdminModal from "./NotAnAdminModal";

const defaultFormInput = {
  name: { value: "", valid: false },
  collection: { value: "", valid: false },
  arrival: { value: "", valid: false },
  price: { value: "", valid: false },
  quantity: { value: "", valid: false },
  brand: { value: "", valid: false },
  category: { value: "", valid: false },
  desc: { value: "", valid: false },
  mainUrl: { value: "", valid: false },
};
// app
const AdminAdd = () => {
  const { Logger, isAdmin, user } = Store();
  const { dispatch } = AdminStore();
  const validate = new Validate();

  // states
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState(defaultFormInput);

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
    if (name == "arrival") {
      status = validate.text(value, ...[,], ...[,], "Arrival");
    }
    if (name == "price") {
      value = parseInt(value);
      status = validate.number(value, 100, ...[,], "Price in Naira");
    }
    if (name == "quantity") {
      value = parseInt(value);
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
        arrival: formInput.arrival.value,
        price: formInput.price.value * 100,
        quantity: formInput.quantity.value,
        brand: formInput.brand.value,
        category: formInput.category.value,
        desc: formInput.desc.value,
        imgOne: url,
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
      e.target.reset();
      setFormInput(defaultFormInput);
      setLoading(false);
      Logger("Product was added succefully", "success");
      dispatch({ type: ADMIN_REFRESH_STATE });
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
            <label htmlFor="arrival">Arrival</label>
            <select
              value={formInput.arrival.value}
              onChange={inputsOnchange}
              name="arrival"
              id="arrival"
            >
              <option disabled value="">
                Select action
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

      <NotAnAdminModal user={user} modal={modal} setModal={setModal} />
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

  & > form {
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

  @media screen and (min-width: 600px) {
    & > form {
      .halfwrap {
        width: 48%;
      }
    }
  }
`;
