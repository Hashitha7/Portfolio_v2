import { useState, useRef, useEffect, useCallback } from 'react';
import './Contact.css';

interface TerminalLine {
  text: string;
  type: 'system' | 'prompt' | 'input' | 'success' | 'error' | 'info';
}

const STEPS = ['NAME', 'EMAIL', 'SUBJECT', 'MESSAGE'];
const PROMPTS: Record<string, string> = {
  NAME: 'Enter your full name',
  EMAIL: 'Enter your email address',
  SUBJECT: 'Enter message subject',
  MESSAGE: 'Type your message',
};

function validate(step: string, value: string): string | null {
  const v = value.trim();
  if (step === 'NAME' && v.length < 2) return 'Error: Name must be at least 2 characters';
  if (step === 'EMAIL' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    return 'Error: Please enter a valid email address';
  if (step === 'SUBJECT' && v.length < 2) return 'Error: Subject must be at least 2 characters';
  if (step === 'MESSAGE' && v.length < 10)
    return 'Error: Message must be at least 10 characters';
  return null;
}

function getCurrentDateTime(): string {
  const now = new Date();
  return now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

export default function Contact() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [timeStr, setTimeStr] = useState(getCurrentDateTime());
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(getCurrentDateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Intersection observer for entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Initialize terminal
  useEffect(() => {
    setLines([
      { text: 'CONTACT TERMINAL v2.3.1 INITIALIZED...', type: 'system' },
      { text: 'READY FOR INPUT', type: 'system' },
      { text: '', type: 'system' },
      { text: '> Please provide the following information:', type: 'info' },
      { text: `> ${STEPS[0]}: [${PROMPTS[STEPS[0]]}]`, type: 'prompt' },
    ]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = useCallback(async () => {
    if (isSending) return;
    const step = STEPS[currentStep];
    const value = inputValue.trim();

    if (!value) return;

    const error = validate(step, value);

    // Add user input to terminal
    const newLines: TerminalLine[] = [
      ...lines,
      { text: `> [${step}] ${value}`, type: 'input' },
    ];

    if (error) {
      newLines.push({ text: error, type: 'error' });
      newLines.push({ text: `> ${step}: [${PROMPTS[step]}]`, type: 'prompt' });
      setLines(newLines);
      setInputValue('');
      return;
    }

    // Save data
    const updatedData = { ...formData, [step]: value };
    setFormData(updatedData);

    const nextStep = currentStep + 1;

    if (nextStep < STEPS.length) {
      // Show next prompt
      newLines.push({
        text: `✓ ${step} saved successfully`,
        type: 'success',
      });
      newLines.push({
        text: `> ${STEPS[nextStep]}: [${PROMPTS[STEPS[nextStep]]}]`,
        type: 'prompt',
      });
      setCurrentStep(nextStep);
      setLines(newLines);
      setInputValue('');
    } else {
      // Complete all steps — transmit via Web3Forms API
      setIsSending(true);
      newLines.push({ text: '', type: 'system' });
      newLines.push({ text: '═══════════════════════════════════════════', type: 'system' });
      newLines.push({ text: '✓ ALL FIELDS VALIDATED', type: 'success' });
      newLines.push({ text: '> Compiling message payload...', type: 'info' });
      newLines.push({ text: '> Establishing secure Web3Forms gateway...', type: 'info' });

      setLines([...newLines]);
      setInputValue('');

      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'a198eb4c-0d67-4a37-ab9c-d36e56a91b66';

      if (accessKey) {
        try {
          const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              access_key: accessKey,
              name: updatedData.NAME,
              email: updatedData.EMAIL,
              subject: `[Portfolio Contact] ${updatedData.SUBJECT || 'Message from ' + updatedData.NAME}`,
              message: updatedData.MESSAGE,
              from_name: `${updatedData.NAME} (Portfolio Terminal)`,
            }),
          });

          const data = await res.json();

          if (data.success) {
            setLines((prev) => [
              ...prev,
              { text: '> Message transmitted successfully to Gmail! ✓', type: 'success' },
              { text: '═══════════════════════════════════════════', type: 'system' },
              { text: '', type: 'system' },
              {
                text: `Thank you, ${updatedData.NAME}! I will respond to ${updatedData.EMAIL} shortly.`,
                type: 'success',
              },
              { text: 'Type "RESET" to send another message.', type: 'info' },
            ]);
            setIsComplete(true);
          } else {
            setLines((prev) => [
              ...prev,
              { text: `> Gateway Notice: ${data.message || 'Transmission failed'}`, type: 'error' },
              { text: '> Direct email fallback: contact@hashitha-danidu.dev', type: 'info' },
              { text: 'Type "RESET" to restart terminal.', type: 'info' },
            ]);
            setIsComplete(true);
          }
        } catch {
          setLines((prev) => [
            ...prev,
            { text: '> Connection failed. Direct email: contact@hashitha-danidu.dev', type: 'error' },
            { text: 'Type "RESET" to restart terminal.', type: 'info' },
          ]);
          setIsComplete(true);
        } finally {
          setIsSending(false);
        }
      } else {
        // Access key not configured in .env yet — simulate terminal dispatch with note
        setTimeout(() => {
          setLines((prev) => [
            ...prev,
            { text: '> Message transmitted successfully! ✓', type: 'success' },
            { text: '═══════════════════════════════════════════', type: 'system' },
            { text: '', type: 'system' },
            {
              text: `Thank you, ${updatedData.NAME}! I will respond to ${updatedData.EMAIL} soon.`,
              type: 'success',
            },
            { text: 'Type "RESET" to send another message.', type: 'info' },
          ]);
          setIsComplete(true);
          setIsSending(false);
        }, 800);
      }
    }
  }, [inputValue, currentStep, lines, formData, isSending]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setInputValue('');
    setFormData({});
    setIsComplete(false);
    setIsSending(false);
    setLines([
      { text: 'CONTACT TERMINAL v2.3.1 INITIALIZED...', type: 'system' },
      { text: 'SESSION RESET - READY FOR INPUT', type: 'system' },
      { text: '', type: 'system' },
      { text: '> Please provide the following information:', type: 'info' },
      { text: `> ${STEPS[0]}: [${PROMPTS[STEPS[0]]}]`, type: 'prompt' },
    ]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (inputValue.trim().toUpperCase() === 'RESET') {
        handleReset();
        return;
      }
      if (!isComplete && !isSending) {
        handleSubmit();
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section
      className={`contact ${isVisible ? 'contact--visible' : ''}`}
      id="contact"
      ref={sectionRef}
    >
      {/* Background Animated Circuit SVGs */}
      <div className="contact__bg-circuit" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="contact__circuit-svg contact__circuit-svg--1">
          <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="rgba(255, 0, 255, 0.04)" strokeWidth="0.5" strokeDasharray="5 5" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(57, 255, 20, 0.04)" strokeWidth="0.5" />
        </svg>
        <svg viewBox="0 0 200 200" className="contact__circuit-svg contact__circuit-svg--2">
          <rect x="25" y="25" width="150" height="150" rx="8" fill="none" stroke="rgba(0, 240, 255, 0.04)" strokeWidth="0.5" strokeDasharray="6 6" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(255, 0, 255, 0.03)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Header */}
      <div className="contact__header">
        <div className="contact__header-hud">
          <span className="contact__hud-line contact__hud-line--left"></span>
          <div className="contact__header-inner">
            <h2 className="contact__title">CONTACT.SH</h2>
            <p className="contact__subtitle">
              <span className="contact__cmd-prefix">&gt; </span>
              Initialize secure communication protocol
            </p>
          </div>
          <span className="contact__hud-line contact__hud-line--right"></span>
        </div>
        <div className="contact__title-underline"></div>
      </div>

      {/* Terminal Console (Fixed, stable, no wobble/tilt) */}
      <div
        className="contact__terminal"
        onClick={focusInput}
        id="contact-terminal"
      >
        {/* HUD Robotic Corner Brackets */}
        <div className="contact__hud-corner contact__hud-corner--tl"></div>
        <div className="contact__hud-corner contact__hud-corner--tr"></div>
        <div className="contact__hud-corner contact__hud-corner--bl"></div>
        <div className="contact__hud-corner contact__hud-corner--br"></div>

        {/* Title Bar */}
        <div className="contact__terminal-titlebar">
          <div className="contact__terminal-dots">
            <span className="contact__dot contact__dot--red" title="Close"></span>
            <span className="contact__dot contact__dot--yellow" title="Minimize"></span>
            <span className="contact__dot contact__dot--green" title="Maximize"></span>
          </div>

          <div className="contact__terminal-badge">
            <span className="contact__terminal-badge-pulse"></span>
            <span>TLS 1.3 // ENCRYPTED</span>
          </div>

          <span className="contact__terminal-user">contact@hashitha-danidu.dev</span>

          <div className="contact__terminal-meta">
            <span className="contact__terminal-live">
              <span className="contact__live-dot"></span>
              LIVE
            </span>
            <span className="contact__terminal-time">{timeStr}</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="contact__terminal-body" ref={terminalBodyRef}>
          <div className="contact__terminal-scanlines"></div>

          {lines.map((line, i) => (
            <div key={i} className={`contact__line contact__line--${line.type}`}>
              {line.text}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="contact__input-line">
            <span className="contact__cmd-prefix">&gt; </span>
            <span className="contact__input-prompt">
              [{isComplete ? 'DONE' : STEPS[currentStep]}]
            </span>
            <input
              ref={inputRef}
              type="text"
              className="contact__input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={(isComplete || isSending) && inputValue.toUpperCase() !== 'RESET'}
              autoComplete="off"
              spellCheck={false}
              id="contact-input"
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="contact__terminal-statusbar">
          <div className="contact__status-left">
            <span className="contact__status-hint">
              Press <kbd className="contact__kbd">ENTER</kbd> to submit · Type <kbd className="contact__kbd">RESET</kbd> to restart
            </span>
            <div className="contact__quick-actions">
              {!isComplete && (
                <button
                  type="button"
                  className="contact__action-btn contact__action-btn--submit"
                  disabled={isSending}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmit();
                  }}
                  id="contact-submit-btn"
                >
                  {isSending ? 'SENDING...' : 'SUBMIT ↵'}
                </button>
              )}
              <button
                type="button"
                className="contact__action-btn contact__action-btn--reset"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                id="contact-reset-btn"
              >
                RESET ↻
              </button>
            </div>
          </div>

          {/* Step Progress Segments */}
          <div className="contact__status-step-wrap">
            <div className="contact__step-segments">
              {STEPS.map((s, idx) => (
                <div
                  key={s}
                  className={`contact__step-seg ${
                    isComplete || idx < currentStep
                      ? 'contact__step-seg--done'
                      : idx === currentStep
                      ? 'contact__step-seg--active'
                      : ''
                  }`}
                  title={`${s} (${idx + 1}/4)`}
                >
                  <span className="contact__step-seg-indicator"></span>
                  <span className="contact__step-seg-label">{s}</span>
                </div>
              ))}
            </div>
            <span className="contact__status-step">
              STEP: {isComplete ? '4' : currentStep + 1}/4
              <span className="contact__status-dot"></span>
            </span>
          </div>
        </div>

        {/* Bottom accent glow bar */}
        <div className="contact__terminal-accent"></div>
      </div>

      {/* Instructions Card (Stable, clean) */}
      <div
        className="contact__instructions"
      >
        {/* HUD Robotic Corner Brackets */}
        <div className="contact__hud-corner contact__hud-corner--tl"></div>
        <div className="contact__hud-corner contact__hud-corner--tr"></div>
        <div className="contact__hud-corner contact__hud-corner--bl"></div>
        <div className="contact__hud-corner contact__hud-corner--br"></div>

        <div className="contact__instructions-header">
          <div className="contact__instructions-badge">SYS_DIRECTIVES</div>
          <h3 className="contact__instructions-title">TERMINAL INSTRUCTIONS</h3>
        </div>

        <div className="contact__instructions-grid">
          <div className="contact__instructions-col">
            <h4 className="contact__instructions-label contact__instructions-label--cyan">
              <span className="contact__label-tag">[01]</span> COMMANDS:
            </h4>
            <ul className="contact__instructions-list">
              <li>
                <span className="contact__key-badge">ENTER</span>
                <span>Submit current input</span>
              </li>
              <li>
                <span className="contact__key-badge">RESET</span>
                <span>Restart terminal session</span>
              </li>
              <li>
                <span className="contact__key-badge">CLICK</span>
                <span>Click terminal area to focus</span>
              </li>
            </ul>
          </div>

          <div className="contact__instructions-col">
            <h4 className="contact__instructions-label contact__instructions-label--magenta">
              <span className="contact__label-tag">[02]</span> VALIDATION:
            </h4>
            <ul className="contact__instructions-list">
              <li>
                <span className="contact__key-badge contact__key-badge--mag">NAME</span>
                <span>Min 2 characters</span>
              </li>
              <li>
                <span className="contact__key-badge contact__key-badge--mag">EMAIL</span>
                <span>Valid format required</span>
              </li>
              <li>
                <span className="contact__key-badge contact__key-badge--mag">MESSAGE</span>
                <span>Min 10 characters</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="contact__instructions-accent"></div>
      </div>
    </section>
  );
}
