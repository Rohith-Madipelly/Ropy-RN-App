import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Saved = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#667979"
      d="M12.435 0h-8.88C1.595 0 0 1.74 0 3.859v14.085c0 1.8 1.188 2.56 2.644 1.69l4.495-2.71c.479-.29 1.252-.29 1.722 0l4.495 2.71c1.456.88 2.644.12 2.644-1.69V3.86C15.99 1.739 14.397 0 12.435 0Z"
    />
  </Svg>
)
export default Saved
