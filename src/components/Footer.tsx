
import React from "react";
import { motion } from "framer-motion";
import { Building2, Copyright, Globe, Mail, Lock, ShieldCheck } from "lucide-react";

export const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="relative z-20 mt-auto"
    >
      <div className="bg-gradient-to-t from-[#1A1F2C] to-transparent pt-16">
        <div className="bg-[#1A1F2C]/95 backdrop-blur-lg border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 md:py-8">
              {/* Security Badges Section */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div 
                  className="flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Lock className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-[11px] font-semibold text-gray-300">SSL Secured</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-[11px] font-semibold text-gray-300">Secure Valuation</span>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                {/* Brand Section */}
                <motion.div 
                  className="flex flex-col space-y-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <Building2 className="w-6 h-6 text-[#9b87f5]" />
                    </div>
                    <div>
                      <h3 className="text-white/90 font-medium text-lg">PropertyValuer</h3>
                      <p className="text-sm text-white/60">Instant Property Valuations</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 max-w-md">
                    Get accurate property valuations powered by advanced AI technology and local market data.
                  </p>
                </motion.div>

                {/* Contact Section */}
                <div className="space-y-4">
                  <h4 className="text-white/90 font-medium">Contact Us</h4>
                  <div className="space-y-3">
                    <motion.a 
                      href="mailto:hello@digitol.co.uk"
                      className="flex items-center space-x-2 text-sm text-white/60 hover:text-white/90 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Mail className="w-4 h-4 text-[#7E69AB]" />
                      <span>hello@digitol.co.uk</span>
                    </motion.a>
                    <motion.a 
                      href="https://www.digitol.co.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-white/60 hover:text-white/90 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Globe className="w-4 h-4 text-[#7E69AB]" />
                      <span>www.digitol.co.uk</span>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-6 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <motion.div 
                    className="flex items-center gap-2 text-sm text-white/60"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Copyright className="w-4 h-4 text-[#7E69AB]" />
                    <span>All Rights Reserved 2025 - Digitol</span>
                  </motion.div>
                  
                  <div className="flex items-center gap-4 md:gap-6">
                    <motion.a 
                      href="/privacy"
                      className="text-sm text-white/60 hover:text-white/90 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      Privacy Policy
                    </motion.a>
                    <motion.a 
                      href="/terms"
                      className="text-sm text-white/60 hover:text-white/90 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      Terms of Service
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
