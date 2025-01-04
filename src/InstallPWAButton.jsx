import React, { useState, useEffect } from 'react';

const InstallPWAButton = () => {
  const [promptEvent, setPromptEvent] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (promptEvent) {
      promptEvent.prompt();
      const choiceResult = await promptEvent.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installed');
      } else {
        console.log('PWA installation declined');
      }
    }
  };

  return promptEvent ? (
    <button onClick={handleInstall}>Install App</button>
  ) : null;
};

export default InstallPWAButton;
