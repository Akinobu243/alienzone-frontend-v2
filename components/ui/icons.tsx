import { IconSvgProps } from "@/types"

export const TwitterX: React.FC<IconSvgProps> = ({
  size = 20,
  width,
  height,
  strokeWidth = 2,
  ...props
}) => (
  <svg
    height={size || height}
    width={size || width}
    viewBox="0 0 21 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.937557 20.9359L0.800318 21.1H1.01427H2.67017H2.71694L2.74692 21.0641L9.14185 13.408L14.221 21.0553L14.2507 21.1H14.3043H20H20.187L20.0832 20.9445L12.4446 9.50026L19.4488 1.06388L19.5849 0.9H19.3719H17.6875H17.6406L17.6106 0.935975L11.5723 8.18077L6.73603 0.944434L6.70634 0.9H6.65289H1H0.813189L0.916785 1.05545L8.29831 12.1321L0.937557 20.9359ZM15.171 19.6656L3.47259 2.40786H5.78627L17.5129 19.6656H15.171Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.2"
    />
  </svg>
)
