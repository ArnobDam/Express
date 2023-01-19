import { useDropzone } from "react-dropzone";
import { shallowEqual, useSelector } from "react-redux";
import { selectCategoriesListForRow } from "../../../store/categories";
import { formatCategoryTitle } from "../../../utils/formatCategoryTitle";
import { Modal } from "../../shared/components/Modal";

function ModalFormHeader({ title }) {
  return <h2 className="modal-title">{title}</h2>;
}

function ModalFormFooter({ errors, formId, onClose }) {
  return (
    <>
      <div className="form-buttons">
        <div>
          <button type="submit" className="save-button" form={formId}>
            Save
          </button>
        </div>
        <div>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
      <div
        style={{
          color: "var(--error-red)",
          fontSize: "12px",
          textAlign: "center",
          marginTop: "12px",
        }}
      >
        {errors && errors.message}
      </div>
    </>
  );
}

function ModalFormBody({ onSubmit, formId, formData, onChange, onDrop }) {
  const categoriesList = useSelector(selectCategoriesListForRow, shallowEqual);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data" id={formId}>
      <div>
        <input
          className="product-form-input"
          type="text"
          name="name"
          required
          placeholder="Name"
          value={formData.name ?? ""}
          onChange={onChange}
        />
      </div>
      <div>
        <select
          className="select-option"
          name="category"
          id="category"
          required
          value={formData.category ?? ""}
          onChange={onChange}
        >
          <option value="" key="">
            Select category
          </option>
          {categoriesList.map((category) => (
            <option key={category.id} value={category.id}>
              {formatCategoryTitle(category)}
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
          value={formData.description ?? ""}
          onChange={onChange}
        />
      </div>
      <div>
        <input
          className="product-form-input"
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price ?? ""}
          required
          onChange={onChange}
        />
      </div>
      <div
        className="pic-input"
        {...getRootProps({ style: { cursor: "pointer" } })}
      >
        <input {...getInputProps({ name: "imageUrl" })} />
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
    </form>
  );
}

function ModalFormContainer({
  errors,
  formBodyClassName,
  formData,
  title,
  formId,
  onClose,
  onDrop,
  onChange,
  onSubmit,
}) {
  return (
    <div className={formBodyClassName}>
      <ModalFormHeader title={title} />
      <ModalFormBody
        formId={formId}
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        onDrop={onDrop}
      />
      <ModalFormFooter onClose={onClose} errors={errors} formId={formId} />
    </div>
  );
}

export function ModalForm({
  modalClassName,
  formBodyClassName,
  title,
  errors,
  formData,
  formId,
  onChange,
  onDrop,
  onClose,
  onSubmit,
}) {
  return (
    <Modal className={modalClassName}>
      <ModalFormContainer
        title={title}
        onClose={onClose}
        formBodyClassName={formBodyClassName}
        errors={errors}
        formId={formId}
        onSubmit={onSubmit}
        formData={formData}
        onChange={onChange}
        onDrop={onDrop}
      />
    </Modal>
  );
}
