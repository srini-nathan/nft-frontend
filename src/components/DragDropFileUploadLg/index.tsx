import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Button, Container } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import styles from "./DragDropFilePreview.module.css";

const megaByte = 1000 * 1000;

export type UploadedFile = {
  name: string;
  preview: string;
  doNotUpload?: boolean;
};

const DragDropFileUploadLg = ({
  setFormFile,
}: {
  setFormFile: (file: File | null) => void;
}) => {
  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState("");
  const [fileSize, setFileSize] = useState(0);

  const captureFile = useCallback((file: File) => {
    setFileSize(file.size);
    setFormFile(file);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      // create url for preview
      const blob = new Blob([reader.result!], { type: "image/*" });
      const urlCreator = window.URL || window.webkitURL;
      setImageSrc(urlCreator.createObjectURL(blob));
    };
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        setError("");
        captureFile(file);
      });
    },
    [captureFile]
  );

  const onDropRejected = (file: any) => {
    setError(`${file[0]?.errors[0]?.message} - please try again`);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: ["image/*"],
    maxFiles: 1,
    multiple: false,
    maxSize: 100 * megaByte,
  });

  const refreshUpload = () => {
    setFileSize(0);
    setImageSrc("");
    setFormFile(null)
  };

  return (
    <>
      <div
        className="text-center border border-dashed rounded p-4 mt-4 text-gray-400"
        {...getRootProps()}
      >
        <aside>
          {imageSrc && (
            <div>
              <img
                className={`${styles.imagePreview} m-auto pb-4`}
                src={imageSrc}
              />
            </div>
          )}
        </aside>
        <div>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop a picture here, or click to select a picture</p>
          )}
        </div>
      </div>

      <div>
        <div className="m-3">
          <Button onClick={refreshUpload} size={"sm"}>
            Reset
          </Button>
        </div>
        <Container>
          {error && <h4>{error}</h4>}

          <p>details:</p>
          {fileSize && (
            <>
              <span>fileSize: </span>
              <span>{fileSize / 1000} KB</span>
              <br />
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default DragDropFileUploadLg;
