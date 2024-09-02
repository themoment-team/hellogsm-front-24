'use client';

import { useState } from 'react';

import Image from 'next/image';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { basicRegisterType } from 'types';

import { UploadIcon } from 'shared/assets';
import { CustomFormItem } from 'shared/components';
import { cn } from 'shared/lib/utils';
import { useStore } from 'shared/stores';
import { dataUrltoFile } from 'shared/utils';

interface UploadPhotoProps {
  setValue: UseFormSetValue<basicRegisterType>;
  watch: UseFormWatch<basicRegisterType>;
}

const UploadPhoto = ({ setValue, watch }: UploadPhotoProps) => {
  const store = useStore();
  const { profileImg, setProfileImg } = store;

  const [imageSrc, setImageSrc] = useState<string | null>(profileImg ? profileImg : null);

  const PhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageSrc(reader.result);
          setValue('img', reader.result);
          setProfileImg(reader.result);
          dataUrltoFile(watch('img'), 'img.png');
        }
      };
    }
  };

  return (
    <div className={cn('flex', 'items-end', 'gap-[0.5rem]')}>
      <div className={cn('flex', 'w-[8.75rem]', 'flex-col', 'items-start', 'gap-[0.25rem]')}>
        <CustomFormItem text={'증명사진'} required={true} className="gap-1">
          <input
            className={cn('hidden')}
            type="file"
            id="file-input"
            multiple
            accept=".jpg, .jpeg, .png"
            onChange={PhotoUpload}
          />

          <label
            className={cn(
              'flex',
              'w-[8.75rem]',
              'h-[10rem]',
              'bg-[#F5F6F8]',
              'border-2',
              'rounded-lg',
              'border-gray-200',
              'justify-center',
              'items-center',
              'gap-[0.625rem]',
              'cursor-pointer',
            )}
            htmlFor="file-input"
          >
            {imageSrc ? (
              <Image
                src={profileImg || imageSrc}
                alt="Uploaded"
                className={cn('w-[8.75rem]', 'h-[10rem]', 'object-cover', 'rounded-lg')}
                height={160}
                width={140}
              />
            ) : (
              <div
                className={cn('flex', 'w-[2.8125rem]', 'flex-col', 'items-center', 'gap-[0.25rem]')}
              >
                <UploadIcon />
                <p className={cn('text-gray-400', 'text-[0.75rem]/[1.125rem]', 'font-normal')}>
                  사진 첨부
                </p>
              </div>
            )}
          </label>
        </CustomFormItem>
      </div>
      <ul className={cn('text-slate-600', 'text-[0.75rem]/[1.125rem]', 'font-[400]')}>
        <li>&middot; 5MB 이하</li>
        <li>&middot; 3개월 이내의 3x4 cm 증명사진</li>
      </ul>
    </div>
  );
};

export default UploadPhoto;
