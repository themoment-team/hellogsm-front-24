'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { basicRegisterType } from 'types';

import { UploadIcon } from 'shared/assets';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  CustomFormItem,
} from 'shared/components';
import { cn } from 'shared/lib/utils';
import { useStore } from 'shared/stores';

interface UploadPhotoProps {
  setValue: UseFormSetValue<basicRegisterType>;
  watch: UseFormWatch<basicRegisterType>;
}

const UploadPhoto = ({ setValue, watch }: UploadPhotoProps) => {
  const store = useStore();
  const { profileImg, setProfileImg } = store;
  const [showModal, setShowModal] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const PhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      const file = e.target.files[0];

      if (file.size > MAX_FILE_SIZE) {
        setShowModal(true);
        return;
      }
      if (file.size < MAX_FILE_SIZE) {
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setProfileImg(reader.result);
            setValue('img', reader.result);
          }
        };
      }
    }
  };

  useEffect(() => {
    if (watch('img')) setProfileImg(watch('img'));
  }, []);

  return (
    <>
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
              {profileImg ? (
                <Image
                  src={profileImg}
                  alt="Uploaded"
                  className={cn('w-[8.75rem]', 'h-[10rem]', 'object-cover', 'rounded-lg')}
                  height={160}
                  width={140}
                />
              ) : (
                <div
                  className={cn(
                    'flex',
                    'w-[2.8125rem]',
                    'flex-col',
                    'items-center',
                    'gap-[0.25rem]',
                  )}
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
      <AlertDialog open={showModal}>
        <AlertDialogContent className="w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>이미지는 5MB 이하만 가능합니다.</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowModal(false);
              }}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UploadPhoto;
