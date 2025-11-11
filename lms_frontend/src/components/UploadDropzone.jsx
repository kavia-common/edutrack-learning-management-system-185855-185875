import React, { useCallback, useState } from 'react';
import useUploader from '../hooks/useUploader';

// PUBLIC_INTERFACE
export default function UploadDropzone({ extra = {}, onUploaded }) {
  const [dragOver, setDragOver] = useState(false);
  const { upload, uploading, progress, error } = useUploader();

  const onDrop = useCallback(async (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const res = await upload(file, extra);
    onUploaded?.(res);
  }, [extra, upload, onUploaded]);

  const onPick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await upload(file, extra);
    onUploaded?.(res);
  };

  return (
    <div
      className={`dropzone ${dragOver ? 'over' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
    >
      <div className="dz-body">
        <div>Drag & drop to upload</div>
        <div>or</div>
        <label className="btn-secondary">
          Choose File
          <input type="file" style={{ display: 'none' }} onChange={onPick} />
        </label>
      </div>
      {uploading && (
        <div className="dz-progress">
          <div className="bar" style={{ width: `${progress}%` }} />
          <div className="pct">{progress}%</div>
        </div>
      )}
      {error && <div className="error">Upload failed</div>}
    </div>
  );
}
