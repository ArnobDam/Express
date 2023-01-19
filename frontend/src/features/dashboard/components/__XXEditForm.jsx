import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCurrent,
  clearProductsErrors,
  updateProductAsync,
} from "../../../store/products";
import { closeModal } from "../../../store/ui";

export function EditForm({ productToEdit, categories }) {
  const productErrors = useSelector((state) => state.errors.products);

  const [updateProductFormData, setUpdateProductFormData] = useState({
    name: productToEdit?.name,
    category: productToEdit?.category,
    price: productToEdit?.price,
    description: productToEdit?.description,
    imageUrl: productToEdit?.imageUrl,
  });

  const onDrop = useCallback((_acceptedFiles) => {
    setUpdateProductFormData((prev) => ({
      ...prev,
      imageUrl:
        "https://wallsdesk.com/wp-content/uploads/2017/01/Fast-Food-for-desktop-background.jpg",
    }));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleUpdateChange = (event) => {
    setUpdateProductFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(clearCurrent());
    dispatch(clearProductsErrors());
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    // const formData = new FormData();
    // formData.set("_id", productToEdit._id);
    // formData.set("name", updateProductFormData.name);
    // formData.set("description", updateProductFormData.description);
    // formData.set("price", updateProductFormData.price);
    // formData.set("category", updateProductFormData.category);
    // formData.set("price", updateProductFormData.price * 100);
    // updateProductFormData.imageUrl &&
    //   formData.set("image", updateProductFormData.imageUrl);

    dispatch(
      updateProductAsync({ ...productToEdit, ...updateProductFormData })
    );
  };

  return (
    <div className="EditProductForm">
      <form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
        <h2 className="modal-title">Edit product</h2>
        <div>
          <input
            className="product-form-input"
            type="text"
            name="name"
            placeholder="Name"
            value={updateProductFormData.name}
            onChange={handleUpdateChange}
          />
        </div>
        <div>
          <select
            className="select-option"
            name="category"
            id="category"
            value={updateProductFormData.category}
            onChange={handleUpdateChange}
          >
            <option value="" key="">
              Select category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            className="product-form-input"
            type="text"
            name="description"
            placeholder="Description"
            value={updateProductFormData.description}
            onChange={handleUpdateChange}
          />
        </div>
        <div>
          <input
            className="product-form-input"
            type="number"
            name="price"
            placeholder="Price"
            value={updateProductFormData.price}
            onChange={handleUpdateChange}
          />
        </div>
        <div className="pic-input" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <div>Drop the files here ...</div>
          ) : (
            <div className="photo-content">
              <div className="add-photo"> + </div>
              <div>Drag 'n' drop some files here, </div>
              <div>or click to select files</div>
            </div>
          )}
        </div>

        <div className="form-buttons">
          <div>
            <button type="submit" className="save-button">
              Save changes
            </button>
          </div>
          <div>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCloseModal}
            >
              Discard changes
            </button>
          </div>
        </div>
        {/* TODO: */}
        <div
          style={{
            color: "var(--error-red)",
            fontSize: "12px",
            textAlign: "center",
            marginTop: "12px",
          }}
        >
          {productErrors && productErrors.message}
        </div>
      </form>
    </div>
  );
}
