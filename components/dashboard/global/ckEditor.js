import React, { useEffect, useRef } from "react";
import { apiUrl } from "../../../config";

function Editor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  // Set the CKEditor configuration with file upload adapter
  const editorConfiguration = {
    ckfinder: {
      uploadUrl: `${apiUrl}/api/uploads/`
    },
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo'
  ]
  };

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          config={editorConfiguration}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log({ event, editor, data })
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;
