import { Html } from '@react-three/drei';

const AxisLine = ({
  direction,
  length,
  width,
  isAnimate,
  isVisible,
  isFrameHovered,
  frameId
}) => {
  if (direction === "x") {
    return <>
      <mesh position={[length/2, 0, 0]}>
        <boxGeometry args={[length, width, width]} />
        <meshStandardMaterial color={isAnimate ? 'grey' : 'red'}/>
      </mesh>
      {isFrameHovered && isVisible && frameId !== -1 &&
        <Html
          position={[length*1.2, 0, 0]}
          center
          style={{
            color: "red",
            fontWeight: "bold",
            fontSize: 16
          }}
        >
          x{frameId}
        </Html>
      }
    </>
  } else if (direction === "y") {
    return <>
      <mesh position={[0, length/2, 0]}>
        <boxGeometry args={[width, length, width]} />
        <meshStandardMaterial color={isAnimate ? 'grey' : 'green'}/>
      </mesh>
      {isFrameHovered && isVisible && frameId !== -1 &&
        <Html
          position={[0, length*1.2, 0]}
          center
          style={{
            color: "green",
            fontWeight: "bold",
            fontSize: 16
          }}
        >
          y{frameId}
        </Html>
      }
    </>
  } else if (direction === "z") {
    return <>
      <mesh position={[0, 0, length/2]}>
        <boxGeometry args={[width, width, length]} />
        <meshStandardMaterial color={isAnimate ? 'grey' : 'blue'}/>
      </mesh>
      {isFrameHovered && isVisible && frameId !== -1 &&
        <Html
          position={[0, 0, length*1.2]}
          center
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: 16
          }}
        >
          z{frameId}
        </Html>
      }
    </>
  }
};

export default AxisLine;