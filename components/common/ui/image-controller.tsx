import { useEffect, useState } from 'react';
import { useController, Control } from 'react-hook-form';

interface ImageUploadProps {
  name: string;
  control: Control<any>;
}

function ImageUpload({ name, control }: ImageUploadProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name, control });


  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(()=>{
    if(!value){
        setPreviewUrl(null);
        return;
    }
    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    return ()=> URL.revokeObjectURL(url);
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file); // pushes the File into RHF state -> triggers Yup validation
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={ref}
        onBlur={onBlur}
        onChange={handleFileChange}
      />
     {previewUrl && (
        <img src={previewUrl} alt='preview' className='w-32 h-32 object-cover'/>
     )}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}