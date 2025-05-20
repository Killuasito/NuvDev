import {
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0d14] text-gray-300">
      <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[size:32px_32px]"></div>
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent inline-block">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 group">
                <FaEnvelope className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                <a
                  href="mailto:tififerreira@gmail.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  tififerreira@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <FaPhone className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span className="hover:text-blue-400 transition-colors">
                  (11) 93248-2402
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <FaMapMarkerAlt className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span className="hover:text-blue-400 transition-colors">
                  Vargem Grande Paulista, SP
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent inline-block">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {["Sobre", "Serviços", "Portfólio"].map((item) => (
                <li key={item}>
                  <a
                    href={`/#${item.toLowerCase()}`}
                    className="group flex items-center space-x-2 transition-colors hover:text-blue-400"
                  >
                    <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent inline-block">
              Redes Sociais
            </h3>
            <div className="flex space-x-4">
              {[
                {
                  icon: FaInstagram,
                  href: "https://www.instagram.com/nuvdev/p/DJ1_RTQOk4v/",
                  label: "LinkedIn",
                },
                {
                  icon: FaGithub,
                  href: "https://github.com/Killuasito",
                  label: "GitHub",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-lg hover:bg-white/10 hover:text-blue-400 
                    transform hover:-translate-y-1 transition-all duration-300
                    hover:shadow-lg hover:shadow-blue-500/10"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-blue-400">
              NuvDev (tififerreira@gmail.com).{" "}
            </span>
            <br />
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
