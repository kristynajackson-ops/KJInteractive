export default function Nav() {
  return (
    <nav className="bg-white fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="hover:opacity-80 transition duration-300 no-underline group">
              <img src="/kj-logo-black.png" alt="KJ Design" className="h-12 w-auto transition-transform duration-200 group-hover:scale-110" />
            </a>
          </div>
          <div className="flex items-center space-x-8 h-full">
            <a href="/about" className="group text-gray-700 transition duration-300 no-underline font-semibold relative h-full flex items-stretch">
              <span className="group-hover:bg-[#eff0f0] group-hover:text-[#1db6ac] w-full h-full transition-colors duration-200 block relative flex items-center justify-center px-4 py-2">
                About
                <span className="w-full absolute left-0 bottom-0 h-1 bg-[#1db6ac] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </span>
            </a>
            <a href="/#client-work" className="group text-gray-700 transition duration-300 no-underline font-semibold relative h-full flex items-stretch">
              <span className="group-hover:bg-[#eff0f0] group-hover:text-[#1db6ac] w-full h-full transition-colors duration-200 block relative flex items-center justify-center px-4 py-2">
                Client work
                <span className="w-full absolute left-0 bottom-0 h-1 bg-[#1db6ac] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </span>
            </a>
            <a href="/#ideas" className="group text-gray-700 transition duration-300 no-underline font-semibold relative h-full flex items-stretch">
              <span className="group-hover:bg-[#eff0f0] group-hover:text-[#1db6ac] w-full h-full transition-colors duration-200 block relative flex items-center justify-center px-4 py-2">
                Ideas
                <span className="w-full absolute left-0 bottom-0 h-1 bg-[#1db6ac] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </span>
            </a>
            <a href="/strategy-interactive" className="group text-gray-700 transition duration-300 no-underline font-semibold relative h-full flex items-stretch">
              <span className="group-hover:bg-[#eff0f0] group-hover:text-[#1db6ac] w-full h-full transition-colors duration-200 block relative flex items-center justify-center px-4 py-2">
                Strategy Interactive tool
                <span className="w-full absolute left-0 bottom-0 h-1 bg-[#1db6ac] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </span>
            </a>
            <a href="/#contact" className="group text-gray-700 transition duration-300 no-underline font-semibold relative h-full flex items-stretch">
              <span className="group-hover:bg-[#eff0f0] group-hover:text-[#1db6ac] w-full h-full transition-colors duration-200 block relative flex items-center justify-center px-4 py-2">
                Reach me
                <span className="w-full absolute left-0 bottom-0 h-1 bg-[#1db6ac] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
