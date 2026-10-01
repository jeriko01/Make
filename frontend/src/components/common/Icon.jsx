// Curated icon registry. Using explicit imports (instead of `import * as`)
// lets the bundler tree-shake lucide-react down to only what we use.
// Admin icon-name fields should use one of these names; unknown names fall
// back to a neutral circle. Add more here as needed.
import {
  Circle, Globe, Smartphone, Server, Accessibility, Apple, Layers, LayoutDashboard,
  FileCode, Palette, Braces, Atom, Wind, Terminal, Zap, Hexagon, Route, Database,
  Cloud, Leaf, HardDrive, Target, Feather, GitBranch, Github, Sparkles, Code, Code2, Cpu,
  Box, Boxes, Rocket, Wrench, PenTool, Figma, Chrome, Monitor, Tablet, Shield, ShieldCheck,
  Lock, Search, Mail, MessageSquare, Star, Heart, Gauge, Package,
  Container, Workflow, Component, Blocks, Puzzle, Layout, Paintbrush, Type,
} from 'lucide-react'

const REGISTRY = {
  Circle, Globe, Smartphone, Server, Accessibility, Apple, Layers, LayoutDashboard,
  FileCode, Palette, Braces, Atom, Wind, Terminal, Zap, Hexagon, Route, Database,
  Cloud, Leaf, HardDrive, Target, Feather, GitBranch, Github, Sparkles, Code, Code2, Cpu,
  Box, Boxes, Rocket, Wrench, PenTool, Figma, Chrome, Monitor, Tablet, Shield, ShieldCheck,
  Lock, Search, Mail, MessageSquare, Star, Heart, Bolt: Zap, Gauge, Package,
  Container, Workflow, Component, Blocks, Puzzle, Layout, Paintbrush, Type,
}

export const ICON_NAMES = Object.keys(REGISTRY)

export default function Icon({ name, className = 'h-5 w-5', ...props }) {
  const Cmp = REGISTRY[name] || Circle
  return <Cmp className={className} aria-hidden="true" {...props} />
}
