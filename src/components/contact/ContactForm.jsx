import { useEffect, useRef, useState } from 'react';
import { EMAIL } from './ContactIntro';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqaqpkrg';

// ── Intersection reveal hook ──────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const labelStyle = {
  display: 'block',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(245,245,240,0.4)',
  marginBottom: '8px',
};

const errorStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.78rem',
  color: '#f87171',
  marginTop: '6px',
};

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [cardRef, cardVisible] = useReveal(0.15);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Inline rather than alert() — an alert on a dark themed page is jarring
        // and gives the user nowhere to recover to.
        setSubmitError(`Something went wrong sending that. Email me directly at ${EMAIL}.`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(`Couldn't reach the form service. Email me directly at ${EMAIL}.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 12px 14px;
          color: #f5f5f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .contact-input::placeholder { color: rgba(245,245,240,0.25); }
        .contact-input:focus {
          border-color: #f5c842;
          background: rgba(255,255,255,0.06);
        }
        .contact-input[aria-invalid="true"] { border-color: #f87171; }
        .contact-input:disabled { opacity: 0.55; }

        .contact-submit {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 13px 34px;
          border-radius: 999px;
          border: none;
          background: #f5c842;
          color: #111110;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .contact-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245,200,66,0.28);
        }
        .contact-submit:disabled { opacity: 0.55; cursor: not-allowed; }
      `}</style>

      <section style={{
        background: 'linear-gradient(135deg, #f7e96b 0%, #f5c842 40%, #f0a800 100%)',
        padding: 'clamp(60px, 9vw, 110px) clamp(24px, 8vw, 120px)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Warm accent bleed, echoing the hero's treatment */}
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: '340px', height: '340px', borderRadius: '50%',
          background: '#e07b00', filter: 'blur(90px)', opacity: 0.25,
          pointerEvents: 'none',
        }} />

        <div className="shell-narrow" style={{ position: 'relative' }}>
          <div
            ref={cardRef}
            style={{
              position: 'relative',
              maxWidth: '620px',
              opacity: cardVisible ? 1 : 0,
              transform: cardVisible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Offset shadow card — same device as the hero photo and About photo */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: '#1a1a1a',
              borderRadius: '20px',
              transform: 'translate(12px, 12px)',
              opacity: 0.22,
              zIndex: 0,
            }} />

            <div style={{
              position: 'relative',
              zIndex: 1,
              background: '#111110',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: 'clamp(28px, 4vw, 44px)',
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontWeight: 900,
                color: '#f5f5f0',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                Let's build{' '}
                <em style={{ color: '#f5c842', fontWeight: 700 }}>something</em>
              </h2>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.92rem',
                color: 'rgba(245,245,240,0.45)',
                lineHeight: 1.7,
                marginTop: '12px',
                marginBottom: '32px',
              }}>
                Tell me what you're working on and I'll get back to you.
              </p>

              {success ? (
                <div style={{
                  padding: '28px 24px',
                  borderRadius: '14px',
                  background: 'rgba(74,222,128,0.08)',
                  border: '1px solid rgba(74,222,128,0.25)',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#4ade80',
                    margin: 0,
                  }}>
                    Message sent
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.9rem',
                    color: 'rgba(245,245,240,0.5)',
                    marginTop: '8px',
                    lineHeight: 1.6,
                  }}>
                    Thanks for reaching out — I'll reply as soon as I can.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    style={{
                      marginTop: '18px',
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(245,245,240,0.4)',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.8rem',
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle} htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      className="contact-input"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={submitting}
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && <p style={errorStyle}>{errors.name}</p>}
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle} htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      className="contact-input"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={submitting}
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && <p style={errorStyle}>{errors.email}</p>}
                  </div>

                  <div style={{ marginBottom: '28px' }}>
                    <label style={labelStyle} htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      className="contact-input"
                      name="message"
                      rows={5}
                      placeholder="What are you working on?"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={submitting}
                      aria-invalid={errors.message ? 'true' : 'false'}
                      style={{ resize: 'vertical' }}
                    />
                    {errors.message && <p style={errorStyle}>{errors.message}</p>}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                    <button type="submit" className="contact-submit" disabled={submitting}>
                      {submitting ? 'Sending…' : 'Send message'}
                    </button>
                    <a
                      href={`mailto:${EMAIL}`}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.85rem',
                        color: 'rgba(245,245,240,0.4)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '4px',
                      }}
                    >
                      or email me directly
                    </a>
                  </div>

                  {submitError && (
                    <p style={{ ...errorStyle, marginTop: '18px' }} role="alert">
                      {submitError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
