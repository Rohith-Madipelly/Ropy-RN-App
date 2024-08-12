import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ReelIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M21.917 4H9.083A4.589 4.589 0 0 0 4.5 8.583v12.834A4.59 4.59 0 0 0 9.083 26h12.834a4.59 4.59 0 0 0 4.583-4.583V8.583A4.59 4.59 0 0 0 21.917 4Zm.916 10.083h1.834v1.834h-1.834v-1.834Zm0-1.833v-1.833h1.834v1.833h-1.834ZM21 14.083H10v-8.25h11v8.25ZM8.167 15.917H6.333v-1.834h1.834v1.834Zm0-3.667H6.333v-1.833h1.834v1.833Zm-1.834 5.5h1.834v1.833H6.333V17.75ZM10 15.917h11v8.25H10v-8.25Zm12.833 1.833h1.834v1.833h-1.834V17.75Zm1.834-9.167h-1.834V6.002a2.75 2.75 0 0 1 1.834 2.581Zm-16.5-2.581v2.581H6.333a2.75 2.75 0 0 1 1.834-2.581ZM6.333 21.417h1.834v2.581a2.75 2.75 0 0 1-1.834-2.581Zm16.5 2.581v-2.581h1.834a2.75 2.75 0 0 1-1.834 2.581Z"
    />
  </Svg>
)
export default ReelIcon
