import * as THREE from 'three';
// import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
// import { useBox, useCylinder } from '@react-three/cannon';

type BottleProps = {
    bottleColor: string;
};

export default function BottleWithGlass({ bottleColor }: BottleProps) {
    const { nodes } = useGLTF('/bottle.glb');
    const { viewport } = useThree();

    const xPosition = -viewport.width / 2 + viewport.width * 0.2;

    // console.log(nodes);

    const bead = nodes.Bead_node as THREE.Mesh;
    const bottle = nodes.Bottle_node as THREE.Mesh;
    const cork = nodes.Cork_node as THREE.Mesh;
    const heart = nodes.Heart_node as THREE.Mesh;
    const liquid = nodes.Liquid_node as THREE.Mesh;
    const rope = nodes.Rope_node as THREE.Mesh;
    const stand = nodes.Stand_node as THREE.Mesh;

    return (
        <Center position={[xPosition, 0, 0]}>
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



