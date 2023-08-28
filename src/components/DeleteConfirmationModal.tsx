import React from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onDelete,
}) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900/50 ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="bg-white w-96 p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this pokemon from your team?
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onDelete}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
