import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { apiUrl } from '../../../config';

class CKEditorForBlog extends React.Component {
    
    deleteImage = (imageUrl) => {
        const filename = imageUrl.split('/').pop();
        fetch(`${apiUrl}/upload/blogImage/${filename}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Image deleted successfully");
        })
        .catch(error => {
            console.error("Error deleting image:", error);
        });
    };

    render() {
        const { name, value, onChange, editorLoaded } = this.props;

        return (
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                        return new CkEditorUploadAdapter(loader, this.deleteImage);
                    };
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    /*console.log({ event, editor, data });*/
                    if (onChange) {
                        onChange(data); // Call the provided onChange function with the new data
                    }
                }}
                onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                }}
                name={name}
            />
        );
    }
}

class CkEditorUploadAdapter {
    constructor(loader, deleteImageCallback) {
        this.loader = loader;
        this.deleteImage = deleteImageCallback;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('image', file);

                fetch(`${apiUrl}/upload/blogImage`, {
                    method: 'POST',
                    body: formData,
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(result => {
                        resolve({
                            default: result.url
                        });
                    })
                    .catch(error => {
                        console.error("Error uploading image:", error);
                        reject('Upload failed');
                    });
            }));
    }
}

export default CKEditorForBlog;
