import React, { useState } from 'react';

type IType = 'text' | 'image' | 'default';
interface IResult {
  type: IType;
  result: string | ArrayBuffer | null;
}
export default function File() {
  const [fileInfo, setFileInfo] = useState<IResult>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) return;

    let type: IType = 'default';
    let result = '';
    const reader = new FileReader();
    const url = window.URL.createObjectURL(files[0]);

    if (url) {
      if (/image/.test(files[0].type)) {
        type = 'image';
        result = url;
      } else {
        reader.readAsText(files[0]);
        type = 'text';
        result = 'Not an image';
      }
    } else {
      result = "Your browser doesn't support object URL";
    }
    setFileInfo({ type, result });
  };

  return (
    <div>
      <input type="file" id="files-list" onChange={handleChange} />
      {fileInfo?.type === 'image' && (
        <img style={{ maxWidth: 300 }} src={fileInfo.result as string} />
      )}
      {fileInfo?.type === 'text' && <div>{fileInfo.result}</div>}
    </div>
  );
}
