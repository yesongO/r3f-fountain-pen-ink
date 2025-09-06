import * as THREE from 'three';
// import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, Center } from '@react-three/drei';
// import { useBox, useCylinder } from '@react-three/cannon';

type BottleProps = {
    bottleColor: string;
};

export default function BottleWithGlass({ bottleColor }: BottleProps) {
    const { nodes } = useGLTF('/bottle.glb');
    console.log(nodes);

    const bead = nodes.Bead_node as THREE.Mesh;
    const bottle = nodes.Bottle_node as THREE.Mesh;
    const cork = nodes.Cork_node as THREE.Mesh;
    const heart = nodes.Heart_node as THREE.Mesh;
    const liquid = nodes.Liquid_node as THREE.Mesh;
    const rope = nodes.Rope_node as THREE.Mesh;
    const stand = nodes.Stand_node as THREE.Mesh;

    return (
        <Center position={[-170, 0, 0]}>
            <group>
                {/* bead */}
                <mesh castShadow geometry={(bead as THREE.Mesh).geometry}
                scale={1}
                >
                    <meshPhysicalMaterial
                        transmission={0.9}
                        roughness={0.1}
                        thickness={1.0}
                        ior={5}
                        color={"#ffffff"}
                    />
                </mesh>
                {/* bottle */}
                <mesh castShadow geometry={(bottle as THREE.Mesh).geometry}
                scale={1}
                >
                    <meshPhysicalMaterial
                        transmission={0.01}
                        roughness={0.1}
                        thickness={0.5}
                        ior={2}
                        color={bottleColor}
                    />
                </mesh>
                {/* cork */}
                <mesh castShadow geometry={(cork as THREE.Mesh).geometry}
                scale={1}
                >
                    <meshPhysicalMaterial
                        transmission={0.9}
                        roughness={0.1}
                        thickness={1.0}
                        ior={5}
                        color={"#000000"}
                    />
                </mesh>
                {/* heart */}
                <mesh castShadow geometry={(heart as THREE.Mesh).geometry}
                scale={1}
                >
                    <meshPhysicalMaterial
                        transmission={0.9}
                        roughness={0.1}
                        thickness={1.0}
                        ior={5}
                        color={"#000000"}
                    />
                </mesh>
                {/* liquid */}
                <mesh castShadow geometry={(liquid as THREE.Mesh).geometry}
                scale={1}
                >
                    <meshPhysicalMaterial
                        transmission={0.9}
                        roughness={0.1}
                        thickness={1.0}
                        ior={5}
                        color={bottleColor}
                    />
                </mesh>
                {/* rope */}
                <mesh castShadow geometry={(rope as THREE.Mesh).geometry}
                scale={1}
                >
                    <meshPhysicalMaterial
                        transmission={0.9}
                        roughness={0.1}
                        thickness={1.0}
                        ior={5}
                        color={"#C8C8C8"}
                    />
                </mesh>
                {/* stand */}
                <mesh castShadow geometry={(stand as THREE.Mesh).geometry}
                scale={1}
                >
                    <meshPhysicalMaterial
                        transmission={0.9}
                        roughness={0.1}
                        thickness={1.0}
                        ior={5}
                        color={"#C8C8C8"}
                    />
                </mesh>
            </group>
        </Center>
    )
}

// export default function BottleWithGlass({ onFall }: { onFall: (hasFallen: boolean) => void }) {
//     const { nodes } = useGLTF('/bottle.glb');
//     console.log(nodes);

//     const bead = nodes.Bead_node as THREE.Mesh;
//     const bottle = nodes.Bottle_node as THREE.Mesh;
//     const cork = nodes.Cork_node as THREE.Mesh;
//     const heart = nodes.Heart_node as THREE.Mesh;
//     const liquid = nodes.Liquid_node as THREE.Mesh;
//     const rope = nodes.Rope_node as THREE.Mesh;
//     const stand = nodes.Stand_node as THREE.Mesh;

//     // 병 전체를 감싸는 그룹에 물리 속성을 부여하기 위함.
//     // 이때 useBox는 박스 형태의 몸통을 만드는 역할을 함.
//     const [bottleRef, bottleApi] = useBox(() => ({
//         mass: 1,
//         position: [-120, 0, 0],
//         rotation: [0, 0, 0],
//         args: [10, 30, 10], // 초기 몸통의 크기, 실제 병 크기에 맞추어야 함
//         restitution: 0.3, // 0~1 사이의 값, 탄성력 (1에 가까울수록 강한 탄성력)
//         friction: 0.1, // 0~1 사이의 값, 마찰력 (1에 가까울수록 강한 마찰력)
//         linearFactor: [1, 1, 1],
//         angularFactor: [1, 1, 1],
//     }));

//     // 병이 쓰러졌는지 확인하기 위한 상태
//     const [hasFallen, setHasFallen] = useState(false);

//     // 병을 클릭했을 때 호출되는 함수
//     const handleClick = () => {
//         if (!hasFallen) {
//             bottleApi.applyImpulse([8, 10, 0], [0, 1, 0]); // 병의 특정 지점에 (x, y, z), 특정 방향으로 (x, y, z) 힘을 가함
//             setHasFallen(true);
//             onFall(true);
//         }
//     }


//     return (
//         <Center position={[-120, 0, 0]}>
//             <group ref={bottleRef} onClick={handleClick}>
//                 {/* bead */}
//                 <mesh castShadow geometry={(bead as THREE.Mesh).geometry}
//                 scale={1}
//                 >
//                     <meshPhysicalMaterial
//                         transmission={0.9}
//                         roughness={0.1}
//                         thickness={1.0}
//                         ior={5}
//                         color={"#000000"}
//                     />
//                 </mesh>
//                 {/* bottle */}
//                 <mesh castShadow geometry={(bottle as THREE.Mesh).geometry}
//                 scale={1}
//                 >
//                     <meshPhysicalMaterial
//                         transmission={0.01}
//                         roughness={0.1}
//                         thickness={0.5}
//                         ior={2}
//                         color={"#45458D"}
//                     />
//                 </mesh>
//                 {/* cork */}
//                 <mesh castShadow geometry={(cork as THREE.Mesh).geometry}
//                 scale={1}
//                 >
//                     <meshPhysicalMaterial
//                         transmission={0.9}
//                         roughness={0.1}
//                         thickness={1.0}
//                         ior={5}
//                         color={"#000000"}
//                     />
//                 </mesh>
//                 {/* heart */}
//                 <mesh castShadow geometry={(heart as THREE.Mesh).geometry}
//                 scale={1}
//                 >
//                     <meshPhysicalMaterial
//                         transmission={0.9}
//                         roughness={0.1}
//                         thickness={1.0}
//                         ior={5}
//                         color={"#000000"}
//                     />
//                 </mesh>
//                 {/* liquid */}
//                 <mesh castShadow geometry={(liquid as THREE.Mesh).geometry}
//                 scale={1}
//                 >
//                     <meshPhysicalMaterial
//                         transmission={0.9}
//                         roughness={0.1}
//                         thickness={1.0}
//                         ior={5}
//                         color={"blue"}
//                     />
//                 </mesh>
//                 {/* rope */}
//                 <mesh castShadow geometry={(rope as THREE.Mesh).geometry}
//                 scale={1}
//                 >
//                     <meshPhysicalMaterial
//                         transmission={0.9}
//                         roughness={0.1}
//                         thickness={1.0}
//                         ior={5}
//                         color={"#000000"}
//                     />
//                 </mesh>
//                 {/* stand */}
//                 <mesh castShadow geometry={(stand as THREE.Mesh).geometry}
//                 scale={1}
//                 >
//                     <meshPhysicalMaterial
//                         transmission={0.9}
//                         roughness={0.1}
//                         thickness={1.0}
//                         ior={5}
//                         color={"#000000"}
//                     />
//                 </mesh>
//             </group>
//         </Center>
//     )
// }



