import React, { useState, useEffect } from "react";

const FileUploader = ({ onChange }) => {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        return () => {
            previews.forEach((preview) => {
                if (preview) URL.revokeObjectURL(preview);
            });
        };
    }, [previews]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviews(newPreviews);
        setFiles(selectedFiles);
        if (onChange) onChange(selectedFiles);
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        const updatedPreviews = previews.filter((_, i) => i !== index);
        if (previews[index]) URL.revokeObjectURL(previews[index]);
        setFiles(updatedFiles);
        setPreviews(updatedPreviews);
        if (onChange) onChange(updatedFiles);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
                style={{
                    border: '2px dashed #bdbdbd',
                    borderRadius: '8px',
                    padding: '2rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.3s ease',
                }}
                onClick={() => document.getElementById("media").click()}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#1a73e8';
                    e.currentTarget.style.backgroundColor = '#f0f4ff';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#bdbdbd';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                }}
            >
                <input
                    type="file"
                    id="media"
                    multiple
                    accept="image/*,video/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <svg
                        style={{ width: '24px', height: '24px', color: '#999' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    <p style={{ fontSize: '0.875rem', color: '#666' }}>
                        Arrastra imágenes o haz clic aquí
                    </p>
                </div>
            </div>

            {/* Vista previa más pequeña */}
            {files.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
                    gap: '0.75rem',
                    marginTop: '0.5rem'
                }}>
                    {files.map((file, index) => (
                        <div 
                            key={index} 
                            style={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                            className="group"
                        >
                            <div style={{
                                width: '100%',
                                height: '60px',
                                borderRadius: '6px',
                                border: '1px solid #e0e0e0',
                                overflow: 'hidden',
                                backgroundColor: '#f5f5f5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {file.type.startsWith("image/") ? (
                                    <img
                                        src={previews[index]}
                                        alt={file.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                ) : (
                                    <video
                                        src={previews[index]}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                        controls
                                    />
                                )}
                            </div>

                            {/* Botón eliminar */}
                            <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                style={{
                                    position: 'absolute',
                                    top: '2px',
                                    right: '2px',
                                    backgroundColor: '#dc2626',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    opacity: 0,
                                    transition: 'opacity 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                    e.currentTarget.style.backgroundColor = '#b91c1c';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = '0';
                                    e.currentTarget.style.backgroundColor = '#dc2626';
                                }}
                            >
                                ✕
                            </button>

                            <p style={{
                                fontSize: '0.7rem',
                                marginTop: '0.25rem',
                                color: '#666',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%',
                                textAlign: 'center',
                                paddingX: '2px'
                            }}>
                                {file.name.substring(0, 15)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploader;
