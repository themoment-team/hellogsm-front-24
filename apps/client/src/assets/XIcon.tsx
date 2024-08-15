interface XIconProps {
  className?: string;
}

const XIcon = ({ className }: XIconProps) => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L4 12"
      stroke="#CBD5E1"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    />
    <path
      d="M4 4L12 12"
      stroke="#CBD5E1"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    />
  </svg>
);

export default XIcon;
