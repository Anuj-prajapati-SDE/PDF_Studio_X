import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { useTheme } from '@mui/material';

const ParticlesBackground = () => {
  const theme = useTheme();
  
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  
  const particlesLoaded = useCallback(async (container) => {
    // Optional: Do something after particles are loaded
  }, []);
  
  return (
    <Particles
      id="particles-background"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: false,
          zIndex: -1,
        },
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
              distance: 100,
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: theme.palette.primary.light,
          },
          links: {
            color: theme.palette.primary.light,
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
        top: 0,
        left: 0,
      }}
    />
  );
};

export default ParticlesBackground;