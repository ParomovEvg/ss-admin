import { DropZone$ } from './DropZoneComponent';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
export const DropZone = DropZone$({
  useDropZone: (onChangeDropZone, id) => {
    const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      accept: 'image/*',
      onDrop: onChangeDropZone,
    });

    return {
      getRootProps,
      getInputProps,
    };
  },
});
