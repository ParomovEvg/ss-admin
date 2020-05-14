declare module 'react-multiple-image-input' {
    export default function (props: {
        images: object[];
        setImages: (res: object[]) => void;
        max?: number;
        allowCrop?: boolean;
        theme?: 'dark' | 'light';
        cropConfig?: {
            crop: {
                unit?: 'px' | '%';
                x?: number;
                y?: number;
                width?: number;
                height?: number;
                aspect?: number;
            };
            minWidth?: number;
            minHeight?: number;
            maxWidth?: number;
            maxHeight?: number;
        };
    }): any;
}
