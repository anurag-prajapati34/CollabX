import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Users, Shield, Pen } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-time Collaboration",
    description: "Work together simultaneously with live cursors, instant updates, and seamless synchronization across all devices.",
    gradient: "from-blue-50 to-indigo-50",
    border: "border-blue-100",
    iconBg: "from-blue-600 to-indigo-500"
  },
  {
    icon: Users,
    title: "Group Management",
    description: "Create and manage teams effortlessly with role-based permissions and organized workspaces for every project.",
    gradient: "from-purple-50 to-pink-50",
    border: "border-purple-100",
    iconBg: "from-purple-600 to-pink-500"
  },
  {
    icon: Shield,
    title: "Secure Access",
    description: "Enterprise-grade security with encrypted connections, secure authentication, and comprehensive access controls.",
    gradient: "from-green-50 to-teal-50",
    border: "border-green-100",
    iconBg: "from-green-500 to-teal-500"
  },
  {
    icon: Pen,
    title: "Whiteboard Tools",
    description: "Complete whiteboard toolkit with drawing tools, shapes, sticky notes, for any use case.",
    gradient: "from-orange-50 to-red-50",
    border: "border-orange-100",
    iconBg: "from-orange-500 to-red-500"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-bold text-slate-900 mb-4"
          >
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              collaborate
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Powerful features designed to make remote collaboration seamless and productive
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className={`bg-gradient-to-br ${feature.gradient} h-full border ${feature.border} group-hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-8">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
