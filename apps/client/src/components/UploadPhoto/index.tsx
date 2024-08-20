'use client';

import { useState } from 'react';

import Image from 'next/image';

import { UploadIcon } from 'client/assets';
import { FormItem } from 'client/components';

import { cn } from 'shared/lib/utils';

const UploadPhoto = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const PhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageSrc(reader.result);
        }
      };
    }
  };

  return (
    <div className={cn('flex', 'items-end', 'gap-[0.5rem]')}>
      <div className={cn('flex', 'w-[8.75rem]', 'flex-col', 'items-start', 'gap-[0.25rem]')}>
        <FormItem text={'증명사진'} required={true} className="gap-1">
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
                src={imageSrc}
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
                <p className={cn('text-gray-400', 'text-caption', 'font-normal')}>사진 첨부</p>
              </div>
            )}
          </label>
        </FormItem>
      </div>
      <ul className={cn('text-slate-600', 'text-caption', 'font-[400]')}>
        <li>&middot; 20MB 이하</li>
        <li>&middot; 3개월 이내의 3x4 cm 증명사진</li>
      </ul>
    </div>
  );
};

export default UploadPhoto;
