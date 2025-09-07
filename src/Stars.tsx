import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm'
import * as THREE from 'three'

export default function Stars(props: any) {
    const ref = useRef<any>(null)

    const numStars = 4000;
    const radius = 400;

    const [positions, colors, sizes] = useMemo<[Float32Array, Float32Array, Float32Array]>(() => {
        const positions = random.inSphere(new Float32Array(numStars * 3), { radius });
        const colors = new Float32Array(numStars * 3);
        const sizes = new Float32Array(numStars);

        const colorPalette = [
            // new THREE.Color('#4c728f'),
            // new THREE.Color('#a5d2ef'),
            // new THREE.Color('#4d84a1'),
            new THREE.Color('#FFFFFF'),
            // new THREE.Color('#caf6fd'),
        ];

        for (let i = 0; i < numStars; i++) {
            const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            randomColor.toArray(colors, i * 3);

            sizes[i] = Math.random() < 0.8 ? Math.random() * 0.5 + 0.3 : Math.random() * 1.5 + 0.8;
        }
        return [positions, colors, sizes];
    }, [numStars, radius])

    useFrame((delta: any) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 100
            ref.current.rotation.y -= delta / 150
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} colors={colors} sizes={sizes} stride={3} frustumCulled {...props}>
                <PointMaterial 
                    transparent 
                    vertexColors={true}
                    size={1.8}  // 별의 크기
                    sizeAttenuation={true} 
                    depthWrite={false} />
            </Points>
            {/* <Points positions={random.inSphere(new Float32Array(numStars * 3), {radius: radius * 1.2 })} stride={3} frustumCulled={false}>
                <PointMaterial 
                    color='#B3D1FF'
                    size={0.2} 
                    sizeAttenuation={true} 
                    depthWrite={false} 
                    blending={THREE.AdditiveBlending}
                />
            </Points> */}
        </group>
    )
}