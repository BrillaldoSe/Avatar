import {
  CameraControls,
  ContactShadows,
  Environment,
  Text,
  useTexture,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useChat } from "../hooks/useChat";
import { Avatar } from "./Avatar";

const Background = () => {
  const texture = useTexture("textures/fondoChirag.png"); // Carga la textura
  const { viewport } = useThree(); // Obtiene el tamaño del viewport

  // Calcula la relación de aspecto para ajustar el plano
  const aspectRatio = viewport.width / viewport.height;

  return (
    <mesh position={[0, 0, -5]}>
      {/* Ajusta el plano para que cubra todo el viewport */}
      <planeGeometry args={[viewport.width * 3, (viewport.width * 3) / aspectRatio]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) => (loadingText.length > 2 ? "." : loadingText + ".")); 
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);

  if (!loading) return null;
  
  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

export const Experience = () => {
  const cameraControls = useRef();
  const { cameraZoomed } = useChat();

  useEffect(() => {
    cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
  }, []);

  useEffect(() => {
    if (cameraZoomed) {
      cameraControls.current.setLookAt(0, 1.5, 1.5, 0, 1.5, 0, true);
    } else {
      cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
    }
  }, [cameraZoomed]);

  return (
    <>
      <CameraControls ref={cameraControls} />
      <Background /> {/* Fondo con textura */}
      <Environment preset="sunset" />
      <Suspense>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense>
      <Avatar />
      <ContactShadows opacity={0.7} />
    </>
  );
};
