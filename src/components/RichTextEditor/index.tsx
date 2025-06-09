'use client';

import dynamic from 'next/dynamic';
import React, { MutableRefObject, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type SimpleQuillProps = {
  editorRef: MutableRefObject<string | null | undefined>;
  onChange?: (value: string) => void;
  readOnly?: boolean;
};

const RichTextEditor: React.FC<SimpleQuillProps> = ({ editorRef, onChange, readOnly }) => {
  const modules = useMemo(
    () => ({
      toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }]], // ✅ fixed here
    }),
    [],
  );

  return (
    <ReactQuill
      theme={readOnly ? 'bubble' : 'snow'}
      defaultValue={editorRef.current ?? ''}
      onChange={val => {
        editorRef.current = val;
        onChange?.(val);
      }}
      modules={modules}
      placeholder={readOnly ? '' : 'Write here...'}
      readOnly={readOnly}
      className="rounded-md  bg-base-100 p-0 " 
    />
  );
};

export default RichTextEditor;
