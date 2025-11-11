import { useCallback, useRef, useState } from 'react';
import { api } from '../api/client';

// PUBLIC_INTERFACE
export default function useUploader() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const cancelRef = useRef(null);

  const upload = useCallback(async (file, extra = {}) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    Object.entries(extra).forEach(([k, v]) => formData.append(k, v));

    try {
      const res = await api.uploadResource(formData, (evt) => {
        if (!evt.total) return;
        const pct = Math.round((evt.loaded / evt.total) * 100);
        setProgress(pct);
      });
      return res;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, progress, uploading, error, cancelRef };
}
