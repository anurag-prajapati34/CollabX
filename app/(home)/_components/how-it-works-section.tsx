import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Create Your Account",
    description: "Sign up in seconds with your email or social login. No credit card required for the free plan.",
    gradient: "from-blue-600 to-indigo-500",
    status: "completed"
  },
  {
    number: "2",
    title: "Invite Your Team",
    description: "Add team members via email or shareable links. Set up groups and assign roles in just a few clicks.",
    gradient: "from-purple-600 to-pink-500",
    status: "completed"
  },
  {
    number: "3",
    title: "Start Collaborating",
    description: "Jump into your whiteboard and start creating together. See changes in real-time as your team collaborates.",
    gradient: "from-green-500 to-teal-500",
    status: "active"
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-bold text-slate-900 mb-4"
          >
            Get started in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              3 simple steps
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            From setup to collaboration in minutes - no complex configurations required
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center mx-auto transition-transform duration-300`}
                >
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </motion.div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  {step.status === "active" ? (
                    <Zap className="w-3 h-3 text-white" />
                  ) : (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-600 text-lg">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
