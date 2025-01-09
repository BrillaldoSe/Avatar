import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useThree } from "@react-three/fiber";

export const Experience = () => {
  const texture = useTexture("textures/tuback.jpg");
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      {/* Control de cámara */}
      <OrbitControls />

      {/* Personaje */}
      <Avatar position={[0, -3, 5]} scale={2}  />

      {/* Fondo */}
      <mesh >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Entorno */}
      <Environment preset="sunset" />
    </>
  );
};
