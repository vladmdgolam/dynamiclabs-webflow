import { Canvas, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useInView } from 'react-intersection-observer'

import cubes from './assets/Cubes.mp4'
import lines from './assets/lines.mp4'
import shperes from './assets/spheres_1.mp4'
import og from './assets/Squares_Slow_Linear.mp4'
import { Menu } from './components/Menu'
import { Scene } from './components/Scene'

export type vid = {
  src?: any
  resolution?: number
  scale?: number
  dimensions?: number[]
  [key: string]: any
}

export const videos: { [key: string]: vid } = {
  og: { src: og, name: 'og', scale: 0.75, resolution: 0.17 },
  cubes: {
    name: 'cubes',
    src: cubes,
    resolution: 0.25,
    scale: 0.75,
  },
  spheres: {
    name: 'spheres',
    src: shperes,
    resolution: 0.35,
    scale: 0.65,
  },
  lines: {
    name: 'lines',
    src: lines,
    resolution: 0.25,
    scale: 0.75,
  },
}

const DisableRender = () => useFrame(() => null, 1000)

export default function App({ video }: { video: vid }) {
  const { ref, inView } = useInView()
  const { selectedVideo } = useControls({
    selectedVideo: { value: video.name, options: Object.keys(videos) },
  })
  return (
    <>
      <Menu />
      <div ref={ref} className="canvasContainer">
        <Canvas camera={{ near: 0.001 }}>
          {!inView && <DisableRender />}
          <Scene video={videos[selectedVideo]} />
        </Canvas>
      </div>
    </>
  )
}
