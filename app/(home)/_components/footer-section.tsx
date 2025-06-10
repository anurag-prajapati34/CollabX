import { motion } from "framer-motion";


const socialLinks = [
  {
    name: "X(Twitter)",
    href: "https://x.com/anurag_x34",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.36 8.44 8.44 0 01-2.7 1.03A4.22 4.22 0 0016.5 4a4.24 4.24 0 00-4.23 4.23c0 .33.04.65.1.96A12.04 12.04 0 013 5.17a4.26 4.26 0 001.31 5.64A4.2 4.2 0 012.8 10v.05a4.24 4.24 0 003.39 4.16 4.23 4.23 0 01-1.91.07 4.24 4.24 0 003.95 2.94A8.49 8.49 0 012 19.53a11.95 11.95 0 006.29 1.84c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.36-.01-.53A8.36 8.36 0 0024 5.5a8.21 8.21 0 01-2.34.64 4.18 4.18 0 001.84-2.31z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/anurag-prajapati34/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Github",
    href: "https://github.com/anurag-prajapati34",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.6-4-1.6a3.1 3.1 0 00-1.3-1.7c-1-.7.1-.7.1-.7a2.5 2.5 0 011.8 1.2 2.6 2.6 0 003.6 1 2.6 2.6 0 01.8-1.6c-2.7-.3-5.6-1.4-5.6-6a4.7 4.7 0 011.2-3.3 4.3 4.3 0 01.1-3.2s1-.3 3.4 1.2a11.8 11.8 0 016.2 0c2.4-1.5 3.4-1.2 3.4-1.2a4.3 4.3 0 01.1 3.2 4.7 4.7 0 011.2 3.3c0 4.6-2.9 5.7-5.6 6a2.9 2.9 0 01.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 0z" />
      </svg>
    ),
  },
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

export default function FooterSection() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-1 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-xl text-white">CollabX</span>
            </div>
            <p className="text-slate-400 mb-6">
              Empowering teams to collaborate seamlessly through real-time
              whiteboard experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <span
                  key={social.name}
                  onClick={()=>window.open(social.href,"_blank")}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {social.icon}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-slate-400 text-sm">
            © 2024 CollabX. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
