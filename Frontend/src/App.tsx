import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Snowfall from './components/Snowfall';
import CyberCursor from './components/CyberCursor';
import './App.css';

function App() {
  return (
    <div className="app">
      <CyberCursor />
      <Snowfall />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;
