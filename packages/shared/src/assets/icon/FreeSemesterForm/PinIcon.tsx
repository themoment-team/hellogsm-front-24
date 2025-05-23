interface PinIconProps {
  type: 'ON' | 'OFF';
}

const PinIcon = ({ type }: PinIconProps) => (
  <svg
    width="0.9375rem"
    height="0.875rem"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {type === 'ON' ? (
      <>
        <path
          d="M7.5 9.91602V12.8327"
          stroke="#10B981"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.4165 9.91602H11.5832V8.88935C11.5831 8.6723 11.5224 8.45959 11.408 8.27513C11.2936 8.09066 11.13 7.94177 10.9357 7.84518L9.89734 7.32018C9.70296 7.2236 9.53939 7.0747 9.425 6.89024C9.31061 6.70578 9.24995 6.49306 9.24984 6.27602V3.49935H9.83317C10.1426 3.49935 10.4393 3.37643 10.6581 3.15764C10.8769 2.93885 10.9998 2.6421 10.9998 2.33268C10.9998 2.02326 10.8769 1.72652 10.6581 1.50772C10.4393 1.28893 10.1426 1.16602 9.83317 1.16602H5.1665C4.85708 1.16602 4.56034 1.28893 4.34155 1.50772C4.12275 1.72652 3.99984 2.02326 3.99984 2.33268C3.99984 2.6421 4.12275 2.93885 4.34155 3.15764C4.56034 3.37643 4.85708 3.49935 5.1665 3.49935H5.74984V6.27602C5.74972 6.49306 5.68906 6.70578 5.57467 6.89024C5.46029 7.0747 5.29671 7.2236 5.10234 7.32018L4.064 7.84518C3.86963 7.94177 3.70605 8.09066 3.59167 8.27513C3.47728 8.45959 3.41662 8.6723 3.4165 8.88935V9.91602Z"
          stroke="#10B981"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : (
      <>
        <g clipPath="url(#clip0_1924_5863)">
          <path
            d="M1.3667 1.16602L13.0334 12.8327"
            stroke="#94A3B8"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.2002 9.91602V12.8327"
            stroke="#94A3B8"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.45003 5.25V6.27667C5.44992 6.49372 5.38926 6.70643 5.27487 6.89089C5.16048 7.07535 4.99691 7.22425 4.80253 7.32083L3.7642 7.84583C3.56983 7.94242 3.40625 8.09132 3.29186 8.27578C3.17748 8.46024 3.11681 8.67295 3.1167 8.89V9.91667H10.1167"
            stroke="#94A3B8"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.95023 5.44768V3.49935H9.53357C9.84299 3.49935 10.1397 3.37643 10.3585 3.15764C10.5773 2.93885 10.7002 2.6421 10.7002 2.33268C10.7002 2.02326 10.5773 1.72652 10.3585 1.50772C10.1397 1.28893 9.84299 1.16602 9.53357 1.16602H4.80273"
            stroke="#94A3B8"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1924_5863">
            <rect width="14" height="14" fill="white" transform="translate(0.200195)" />
          </clipPath>
        </defs>
      </>
    )}
  </svg>
);

export default PinIcon;
