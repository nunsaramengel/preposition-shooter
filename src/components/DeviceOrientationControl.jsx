
import React, { useEffect, useState } from 'react';

const DeviceOrientationControl = () => {
    const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
    const [deviceMotion, setDeviceMotion] = useState(null)

  useEffect(() => {
    const handleOrientation = (event) => {
      setOrientation({
        alpha: event.alpha, // Rotation around the z-axis
        beta: event.beta,   // Rotation around the x-axis
        gamma: event.gamma, // Rotation around the y-axis
      });
    };

    // Add event listener for device orientation
    window.addEventListener('deviceorientation', handleOrientation, true);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [orientation]);
    
    useEffect(() => {
        const handleMotion = (event) => {
            setDeviceMotion({
                accelerationIncludingGravity: event.accelerationIncludingGravity,
            })

        }

        window.addEventListener('devicemotion', handleMotion);
        console.log(event.accelerationIncludingGravity)

        return () => {
            window.removeEventListener('devicemotion', handleMotion)
        }
    }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Device Orientation</h1>
      <p>Alpha (Z-axis rotation): {orientation.alpha.toFixed(2)}°</p>
      <p>Beta (X-axis rotation): {orientation.beta.toFixed(2)}°</p>
          <p>Gamma (Y-axis rotation): {orientation.gamma.toFixed(2)}°</p>
          <p>Device Motion:{deviceMotion}</p>
    </div>
  );
};

export default DeviceOrientationControl;
