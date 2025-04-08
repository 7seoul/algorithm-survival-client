import hero_img from '@/assets/hero_img.png'
import { Link } from 'react-router'

function Hero(){
  return (
    <div
      className="hero min-h-96 left-0"
      style={{
        backgroundImage: `url(${hero_img})`,
      }}>
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Algorithm Survival</h1>
          <p className="mb-5">
            알고리즘을 풀어, 그룹에서 살아남으세요
          </p>
          <Link className='btn btn-primary' to="/groups">생존 그룹 찾으러 가기</Link>
        </div>
      </div>
    </div>
  )
}

export default Hero