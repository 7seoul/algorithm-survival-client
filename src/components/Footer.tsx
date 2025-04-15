import { Github, Instagram, Linkedin } from "lucide-react"
import { Link } from "react-router"


function Foot(){
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav>
        <div className="grid grid-flow-col gap-4">
          <span>
            <Link target="_blank" to="https://github.com/7seoul">
              <Github />
            </Link>
          </span>
          <span>
            <Link target="_blank" to="https://www.instagram.com/seungg._.hn/">
              <Instagram />
            </Link>
          </span>
            <Link target="_blank" to="https://www.linkedin.com/in/leedevelop/">
              <Linkedin />
            </Link>
        </div>
      </nav>
      <aside>
        <p>Contact Mail : dltmdgns0508@gmail.com</p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by Develeep</p>
      </aside>
    </footer>
  )
}

export default Foot