'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Zap, 
  Calendar, 
  BarChart3, 
  Settings, 
  Users, 
  PenTool, 
  Bell,
  HelpCircle,
  LogOut,
  X
} from 'lucide-react'
import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    badge: null
  },
  {
    name: 'Campaigns',
    href: '/dashboard/campaigns',
    icon: Zap,
    badge: '3'
  },
  {
    name: 'Content Studio',
    href: '/dashboard/content',
    icon: PenTool,
    badge: null
  },
  {
    name: 'Schedule',
    href: '/dashboard/schedule',
    icon: Calendar,
    badge: null
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    badge: null
  },
  {
    name: 'Audience',
    href: '/dashboard/audience',
    icon: Users,
    badge: null
  }
]

const bottomItems = [
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
    badge: '5'
  },
  {
    name: 'Help & Support',
    href: '/dashboard/help',
    icon: HelpCircle,
    badge: null
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    badge: null
  }
]

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('Dashboard')

  const sidebarVariants = {
    open: {
      width: 280,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      width: 80,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  }

  const contentVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1,
        duration: 0.3
      }
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  }

  const NavItem = ({ item }: { item: typeof navigationItems[0] }) => {
    const isActive = activeItem === item.name
    
    return (
      <motion.div
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href={item.href}
          onClick={() => setActiveItem(item.name)}
          className={`
            relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
            ${isActive 
              ? 'bg-persian_green/10 dark:bg-persian_green/15 text-persian_green border border-persian_green/20' 
              : 'text-night dark:text-snow hover:bg-persian_green/5 dark:hover:bg-persian_green/10'
            }
          `}
        >
          {/* Active indicator - cleaner design */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-persian_green rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          )}
          
          {/* Icon */}
          <div className="relative ml-2">
            <item.icon className={`w-5 h-5 transition-colors duration-200 ${isActive ? 'text-persian_green' : 'text-persian_green/70'}`} />
            
            {/* Badge */}
            {item.badge && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
              >
                {item.badge}
              </motion.div>
            )}
          </div>
          
          {/* Text */}
          <AnimatePresence>
            {isOpen && (
              <motion.span
                variants={contentVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className={`font-medium font-monopoly ${isActive ? 'text-persian_green' : 'text-night dark:text-snow'}`}
              >
                {item.name}
              </motion.span>
            )}
          </AnimatePresence>
          
          {/* Hover glow effect */}
          {!isActive && (
            <div className="absolute inset-0 bg-persian_green/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </Link>
      </motion.div>
    )
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        className={`
          fixed left-0 top-0 h-full bg-snow/95 dark:bg-night/95 backdrop-blur-xl border-r border-persian_green/20 z-50
          lg:relative lg:translate-x-0 lg:z-10
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-brand-secondary-20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-persian_green to-tiffany_blue flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold font-monopoly text-night dark:text-snow">Aquareef</span>
            </div>
            <button
              onClick={() => setActiveItem('')}
              className="p-2 rounded-lg text-persian_green hover:bg-brand-secondary-10 dark:hover:bg-brand-primary-20 transition-colors duration-300 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>

          {/* Bottom Section */}
          <div className="px-4 py-6 border-t border-brand-secondary-20 space-y-2">
            {bottomItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
            
            {/* Logout */}
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group"
            >
              <LogOut className="w-5 h-5" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    variants={contentVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="font-medium font-monopoly"
                  >
                    Sign Out
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  )
} 