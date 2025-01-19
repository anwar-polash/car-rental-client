import { FaGithub, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral border-t mt-auto">
      <div className="max-width">
        <footer className="footer text-base-content p-10 text-white">
          <aside>
            <p className="text-[2rem]  font-bold pt-4">
              <span className="text-[#FFB320]">C</span>ar{" "}
              <span className="text-[#FFB320]">R</span>ental
            </p>
            <p className="text-[1rem] pt-4">
              Rent a car imperdiet sapien porttito the bibenum <br /> ellentesue
              the commodo erat nesuen.
            </p>
            <div>
              <h6 className="footer-title">Social Links</h6>
              <div className="flex gap-6">
                <a className="link link-hover">
                  <FaYoutube className="size-7" />
                </a>
                <a className="link link-hover">
                  <FaFacebook className="size-7" />
                </a>
                <a className="link link-hover">
                  <FaLinkedin className="size-7" />
                </a>
              </div>
            </div>
          </aside>
          <nav>
            <h6 className="footer-title font-bold">Quick Links</h6>
            <a className="link link-hover">About</a>
            <a className="link link-hover">Cars</a>
            <a className="link link-hover">Car Types</a>
            <a className="link link-hover">Team</a>
            <a className="link link-hover">Contact</a>
          </nav>
          <nav>
            <h6 className="footer-title">Subscribe</h6>
            <p>
              Want to be notified about our services. Just sign up and
              <br /> we'll send you a notification by email.
            </p>
            <form>
              <input
                className="w-full p-4 rounded-lg mt-4"
                type="email"
                placeholder="Your email address"
              />
            </form>
          </nav>
        </footer>
      </div>

      <div className="border-t pt-6 flex items-center justify-center pb-8 text-white">
        <span>&copy; {new Date().getFullYear()} </span>
        <FaGithub className="text-black size-5 ml-3 mr-1 -mt-1" />
        <a
          className="text-blue-500 italic"
          href="https://github.com/anwar-polash"
          target="_blank"
          rel="noopener noreferrer">
          Anwar Polash
        </a>
      </div>
    </footer>
  );
};

export default Footer;
