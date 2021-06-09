import React, { useState } from 'react';

type IType = 'text' | 'image' | 'default';
interface IResult {
  type: IType;
  result: string | ArrayBuffer | null;
}
export default function File() {
  const [process, setProcess] = useState<string>();
  const [fileInfo, setFileInfo] = useState<IResult>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    let type: IType = 'default';
    const reader = new FileReader();

    if (!files) return;

    if (/image/.test(files[0].type)) {
      reader.readAsDataURL(files[0]);
      type = 'image';
    } else {
      reader.readAsText(files[0]);
      type = 'text';
    }

    reader.onerror = () => {
      setFileInfo({
        type,
        result: `Could not read file,error code${reader.error?.code}`,
      });
    };
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        setProcess(`${(event.loaded / event.total) * 100}%`);
      }
    };
    reader.onload = () => {
      setFileInfo({
        type,
        result: reader.result,
      });
    };
  };

  return (
    <div>
      <input type="file" id="files-list" onChange={handleChange} />
      {fileInfo?.type === 'image' && (
        <img style={{ maxWidth: 300 }} src={fileInfo.result as string} />
      )}
      {fileInfo?.type === 'text' && <div>{fileInfo.result}</div>}
      {fileInfo && fileInfo.type && <div>process:{process}</div>}
    </div>
  );
}
