import * as THREE from 'three';
import { useRef, useState, Suspense } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import BottleWithGlass from './BottleWithGlass.tsx';
import './App.css'
import Stars from './Stars.tsx';


// Rig 컴포넌트
function Rig( {children}: {children: React.ReactNode}) {
  const ref = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  useFrame(() => {
    // 마우스의 x,y 위치에 따라 ref 그룹의 회전을 부드럽게 변경합니다.
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouse.x * Math.PI * 0.1, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.y * Math.PI * 0.1, 0.05);
  });
  return (
    <group ref={ref}>
      {children}
    </group>
  );
}

// 색상 컬러 3종류 : milkyWay(보라빛), christmasStar(노란빛), pulsarPulse(파란빛)
const colorOptions = [
  { id: 'milkyWay', bottleColor: '#45458D', cssClass: 'milkyWay', label: 'milky way'},
  { id: 'pulsarPulse', bottleColor: '#006297', cssClass: 'pulsarPulse', label: 'pulsar pulse'},
  { id: 'christmasStar', bottleColor: '#d59a38', cssClass: 'christmasStar', label: 'christmas star'},
  { id: 'cherryRed', bottleColor: '#8b0000', cssClass: 'cherryRed', label: 'cherry red'},
]

function App() {
  // 배경색 변경 상태 관리
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleColorChange = (colorId: string) => {
    const newColor = colorOptions.find(c => c.id === colorId);
    if (newColor) {
      setSelectedColor(newColor);
    }
  };

  return (
    <div className={`App ${selectedColor.cssClass}`}>
    <Canvas shadows camera={{ position: [0, 5, 500], fov: 50 }}>
      {/* <color attach="background" args={isColor ? ["#2F274C"] : ["#000000"]} /> */}
      <Suspense fallback={null}>
        {selectedColor.id === 'milkyWay' && <Stars />}
        {selectedColor.id === 'christmasStar' && <Stars />}
        {selectedColor.id === 'pulsarPulse' && <Stars />}
        {selectedColor.id === 'cherryRed' && <Stars />}
      </Suspense>

      {/* <OrbitControls 
        maxDistance={700}
        minDistance={100}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      /> */}

      <spotLight 
        position={[0, 1000, 100]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={10}
        shadow-camera-far={5000}
        shadow-bias={-0.0001}
      />

      <Environment preset="forest" />

        <Physics gravity={[0, 0, 0]}>
          <Rig>
              <BottleWithGlass bottleColor={selectedColor.bottleColor} />
          </Rig>
        </Physics>
    </Canvas>
    <ColorPalette options={colorOptions} selectedColor={selectedColor} onColorChange={handleColorChange} />
    </div>
  )
}

type PaletteProps = {
  options: typeof colorOptions;
  selectedColor: typeof colorOptions[0];
  onColorChange: (id: string) => void;
}

function ColorPalette({ options, selectedColor, onColorChange }: PaletteProps) {
  return (
    <div className="palette-container">
      {options.map(option => {
        const isActive = option.id === selectedColor.id;
        const itemClassName = `palette-item ${isActive ? 'active' : ''}`;
        return (
          <div key={option.id} className={itemClassName} onClick={() => onColorChange(option.id)}>
            <div
              className="swatch"
              style={{ backgroundColor: option.bottleColor }}
            />
            <span className="label">{option.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default App

// function App() {
//   // 배경색 변경 상태 관리
//   const [isColor, setIsColor] = useState(false);

//   const handleBottleFall = (fallen: boolean) => {
//     if (fallen) {
//       setIsColor(true);
//     }
//   };

//   const appClassName = `App ${isColor ? 'color' : 'basic'}`;

//   return (
//     <div className={appClassName}>
//     <Canvas shadows camera={{ position: [0, 5, 500], fov: 50 }}>
//       {/* <color attach="background" args={isColor ? ["#2F274C"] : ["#000000"]} /> */}

//       <Suspense fallback={null}>
//         {isColor && <Stars />}
//       </Suspense>

//       {/* <OrbitControls 
//         maxDistance={700}
//         minDistance={100}
//         minPolarAngle={Math.PI / 4}
//         maxPolarAngle={Math.PI / 2}
//       /> */}

//       <spotLight 
//         position={[0, 1000, 100]} 
//         angle={0.3} 
//         penumbra={1} 
//         intensity={1} 
//         castShadow 
//         shadow-mapSize={[1024, 1024]}
//         shadow-camera-near={10}
//         shadow-camera-far={5000}
//         shadow-bias={-0.0001}
//       />

//       <Environment preset="forest" />

//         <Physics gravity={[0, 0, 0]}>
//         {/* <Debug color="lightblue" scale={1.01}> */}
//           <Rig>
//               <BottleWithGlass onFall={handleBottleFall}/>
//               {/* <Boundaries /> */}
//           </Rig>
//         {/* </Debug> */}
//         </Physics>
//     </Canvas>
//     </div>
//   )
// }

// export default App
