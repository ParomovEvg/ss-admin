import React from 'react';

import './DropZone.scss';
import { createFipc } from 'react-fipc';
type DropZoneComponentProps = {
  useDropZone: (
    onChangeDropZone: (acceptedFiles: File[]) => void,
    id: number
  ) => {
    getInputProps?: any;
    getRootProps?: any;
  };
  onChangeDropZone: (acceptedFiles: File[]) => void;
  id: number;
  url: string;
};

const DropZoneComponent: React.FC<DropZoneComponentProps> = ({
  useDropZone,
  children,
  onChangeDropZone,
  url,
  id,
}) => {
  const { getInputProps, getRootProps } = useDropZone(onChangeDropZone, id);
  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <p>
        {url !== '' ? (
          <img className="dropzone__img" key={url} src={url} alt="" />
        ) : (
          'Перетащите или кликните, чтобы загрузить фотографию'
        )}
      </p>
    </div>
  );
};

export const DropZone$ = createFipc(DropZoneComponent);
