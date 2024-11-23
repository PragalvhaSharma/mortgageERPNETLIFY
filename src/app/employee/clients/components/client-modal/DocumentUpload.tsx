'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaFile, FaTrash } from 'react-icons/fa'

interface DocumentUploadProps {
  mode: 'view' | 'edit'
  documents: File[]
  onDocumentsChange: (files: File[]) => void
}

export default function DocumentUpload({ mode, documents, onDocumentsChange }: DocumentUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onDocumentsChange([...documents, ...acceptedFiles])
  }, [documents, onDocumentsChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const removeDocument = (indexToRemove: number) => {
    onDocumentsChange(documents.filter((_, index) => index !== indexToRemove))
  }

  if (mode === 'view') {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Uploaded Documents</h3>
        {documents.length === 0 ? (
          <p className="text-gray-500">No documents uploaded</p>
        ) : (
          <ul className="space-y-2">
            {documents.map((file, index) => (
              <li key={index} className="flex items-center space-x-2 text-gray-700">
                <FaFile className="text-gray-400" />
                <span>{file.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag and drop files here, or click to select files'}
        </p>
      </div>

      {documents.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Uploaded Files:</h4>
          <ul className="space-y-2">
            {documents.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div className="flex items-center space-x-2">
                  <FaFile className="text-gray-400" />
                  <span className="text-sm">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 