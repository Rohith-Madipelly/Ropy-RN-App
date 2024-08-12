import * as React from "react"
import Svg, { Circle } from "react-native-svg"
const DotIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={6}
    height={6}
    fill="none"
    {...props}
  >
    <Circle cx={3} cy={3} r={3} fill="#03C4CB" />
  </Svg>
)
export default DotIcon
