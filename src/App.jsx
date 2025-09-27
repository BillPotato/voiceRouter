import React from 'react';

// Icon components (inline SVG for simplicity)
const SalesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-500">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <path d="M12 6v1.17c0 .41.25.79.63.95l3.23 1.37c.4.17.64.58.64 1.01V12m-6-1.5V9a1.5 1.5 0 0 1 3 0v1.5"/>
    <path d="M12 12h.01"/>
  </svg>
);

const SupportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-green-500">
    <path d="M12 22a7 7 0 0 0 7-7h-4a3 3 0 0 1-3-3V8a3 3 0 0 1-3-3H5a7 7 0 0 0 7 14z"/>
    <path d="M21 15a4 4 0 0 0-4-4"/>
    <path d="M16 11a2 2 0 0 1-2-2"/>
    <path d="M3 5a4 4 0 0 1 4-4"/>
    <path d="M8 3a2 2 0 0 0 2 2"/>
  </svg>
);

const BillingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-purple-500">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const GeneralIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-yellow-500">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const AiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-indigo-500">
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <path d="m12 17 0 .01"/>
        <path d="M21 12a9 9 0 1 1-9-9" />
        <path d="M12 3v1" />
        <path d="M12 20v1" />
        <path d="m4.93 4.93 1 1" />
        <path d="m18.07 18.07 1 1" />
        <path d="m3 12 1 0" />
        <path d="m20 12 1 0" />
        <path d="m4.93 19.07 1-1" />
        <path d="m18.07 5.93 1-1" />
    </svg>
);


// Card component to display department info
const ContactCard = ({ icon, title, description, color, buttonText = "Get in Touch" }) => {
  const cardStyles = {
    blue: {
      border: 'border-blue-500/50 hover:border-blue-500',
      button: 'bg-blue-500 hover:bg-blue-600',
      focus: 'focus:ring-blue-400',
    },
    green: {
      border: 'border-green-500/50 hover:border-green-500',
      button: 'bg-green-500 hover:bg-green-600',
      focus: 'focus:ring-green-400',
    },
    purple: {
      border: 'border-purple-500/50 hover:border-purple-500',
      button: 'bg-purple-500 hover:bg-purple-600',
      focus: 'focus:ring-purple-400',
    },
    yellow: {
      border: 'border-yellow-500/50 hover:border-yellow-500',
      button: 'bg-yellow-500 hover:bg-yellow-600',
      focus: 'focus:ring-yellow-400',
    },
    indigo: {
      border: 'border-indigo-500/50 hover:border-indigo-500',
      button: 'bg-indigo-500 hover:bg-indigo-600',
      focus: 'focus:ring-indigo-400',
    },
  };

  const styles = cardStyles[color] || cardStyles.blue; // Fallback to blue

  // Speech-to-text modal state
  const [showModal, setShowModal] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const [audioURL, setAudioURL] = React.useState(null);
  const [transcript, setTranscript] = React.useState('');
  const mediaRecorderRef = React.useRef(null);
  const audioChunksRef = React.useRef([]);

  // Start recording
  const startRecording = async () => {
    setTranscript('');
    setAudioURL(null);
    setRecording(true);
    audioChunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new window.MediaRecorder(stream, { mimeType: 'audio/webm' });
    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };
    mediaRecorderRef.current.onstop = async () => {
      const webmBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      setAudioURL(URL.createObjectURL(webmBlob));
      // Convert webm to WAV 16kHz mono
      const wavBlob = await convertWebmToWav(webmBlob);
      sendAudioToBackend(wavBlob);
    };
    mediaRecorderRef.current.start();
  };

  // Stop recording
  const stopRecording = () => {
    setRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  // Send audio to backend
  const sendAudioToBackend = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    try {
      const res = await fetch('http://localhost:5000/api/speech-to-text', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setTranscript(data.transcript || 'No transcript received.');
    } catch (err) {
      setTranscript('Error: ' + err.message);
    }
  };

  // Convert webm to WAV 16kHz mono using Web Audio API
  const convertWebmToWav = async (webmBlob) => {
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    // Convert to mono
    const monoBuffer = audioCtx.createBuffer(1, audioBuffer.length, 16000);
    monoBuffer.getChannelData(0).set(audioBuffer.getChannelData(0));
    // Encode WAV
    const wavBuffer = encodeWAV(monoBuffer);
    return new Blob([wavBuffer], { type: 'audio/wav' });
  };

  // WAV encoding helper
  function encodeWAV(audioBuffer) {
    const numChannels = 1;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const samples = audioBuffer.getChannelData(0);
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(view, 8, 'WAVE');
    // FMT sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, format, true); // AudioFormat
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * bitDepth / 8, true);
    view.setUint16(32, numChannels * bitDepth / 8, true);
    view.setUint16(34, bitDepth, true);
    // Data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, samples.length * 2, true);
    // Write PCM samples
    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    return buffer;
  }

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // Modal for speech-to-text
  const SpeechModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={() => setShowModal(false)}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Speak your question</h2>
        <div className="flex flex-col items-center">
          {!recording && (
            <button className="mb-4 px-6 py-2 bg-indigo-500 text-white rounded-lg" onClick={startRecording}>Start Recording</button>
          )}
          {recording && (
            <button className="mb-4 px-6 py-2 bg-red-500 text-white rounded-lg" onClick={stopRecording}>Stop Recording</button>
          )}
          {audioURL && (
            <audio controls src={audioURL} className="mb-4" />
          )}
          {transcript && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded w-full text-center">
              <strong>Transcript:</strong>
              <div className="mt-2">{transcript}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 ${styles.border} transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-gray-100 dark:bg-gray-900 mx-auto">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-6 h-12">{description}</p>
      {color === 'indigo' ? (
        <>
          <button
            className={`w-full py-3 px-6 rounded-lg text-white font-semibold ${styles.button} transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${styles.focus}`}
            onClick={() => setShowModal(true)}
          >
            {buttonText}
          </button>
          {showModal && <SpeechModal />}
        </>
      ) : (
        <button
          className={`w-full py-3 px-6 rounded-lg text-white font-semibold ${styles.button} transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${styles.focus}`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

function App() {
  const departments = [
    {
      icon: <SalesIcon />,
      title: "Sales Department",
      description: "For questions about pricing, plans, and partnerships.",
      color: 'blue'
    },
    {
      icon: <SupportIcon />,
      title: "Technical Support",
      description: "Get help with technical issues, bugs, or product features.",
      color: 'green'
    },
    {
      icon: <AiIcon />,
      title: "Not Sure?",
      description: "Let our AI assistant guide you to the right department.",
      color: 'indigo',
      buttonText: 'Ask AI Assistant'
    },
    {
      icon: <BillingIcon />,
      title: "Billing & Payments",
      description: "Manage your subscription, invoices, and payment details.",
      color: 'purple'
    },
    {
      icon: <GeneralIcon />,
      title: "General Inquiry",
      description: "For all other questions and general information.",
      color: 'yellow'
    },
    
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        {/* Background gradient shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-30"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:opacity-30"></div>
      
      <div className="container mx-auto max-w-7xl relative">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
            How can we help you?
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose a department below to get in touch with our team. We're here to assist you with any questions or issues you might have.
          </p>
        </header>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {departments.map((dept, index) => (
            <ContactCard
              key={index}
              icon={dept.icon}
              title={dept.title}
              description={dept.description}
              color={dept.color}
              buttonText={dept.buttonText}
            />
          ))}
        </main>
        
        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Your Company Inc. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
