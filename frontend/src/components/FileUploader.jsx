import React, { useState } from "react";
// import styles from "./FileUploader.module.css"; // puedes quitar esto si no usas CSS modules

const FileUploader = ({ onChange }) => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);

        if (onChange) onChange(selectedFiles); // pasa los archivos al padre si es necesario
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        if (onChange) onChange(updatedFiles);
    };

    return (
        <div className="flex flex-col gap-3">
            <label htmlFor="media" className="font-medium text-gray-800">
                Imágenes y videos
            </label>

            <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => document.getElementById("media").click()}
            >
                <input
                    type="file"
                    id="media"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <p className="text-gray-500 text-center">
                    📁 Haz clic o arrastra archivos aquí
                </p>
            </div>

            {/* Previsualización */}
            {files.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-3">
                    {files.map((file, index) => (
                        <div key={index} className="relative group">
                            {file.type.startsWith("image/") ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-full h-32 object-cover rounded-lg border"
                                />
                            ) : (
                                <video
                                    src={URL.createObjectURL(file)}
                                    className="w-full h-32 object-cover rounded-lg border"
                                    controls
                                />
                            )}

                            {/* Botón para eliminar */}
                            <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                            >
                                ✕
                            </button>

                            <p className="text-xs mt-1 text-gray-600 truncate text-center">
                                {file.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploader;
