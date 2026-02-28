import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { authenticate } from '../actions/auth';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const { theme, setTheme, appliedTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', appliedTheme === 'dark');
  }, [appliedTheme]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Direct login without API for demo
    authenticate({
      token: 'demo-token',
      user: {
        _id: 'demo-id',
        name: 'Listify Demo Admin',
        email: 'demo@admin.com',
        role: 'admin',
        username: 'demo_admin'
      }
    });
    navigate('/dashboard');
    // window.location.reload(); 
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page-wrapper" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>

      <div className="container-fluid g-0">
        <div className="row g-0">
          {/* Left Side - Hero Image */}
          <div className="col-lg-6 d-none d-lg-block login-hero-section" style={{
            height: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="hero-overlay" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.2
            }}></div>

            <div className="hero-text text-center" style={{ position: 'relative', zIndex: 2, padding: '0 4rem' }}>
              <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2' }}>
                Discover Amazing Places
              </h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
                Join thousands of users who trust Listify to find and share best local businesses, services, and attractions in their area.
              </p>
              <div className="hero-stats" style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '40px' }}>
                <div className="stat-item">
                  <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>50K+</div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>Active Users</div>
                </div>
                <div className="stat-item">
                  <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>10K+</div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>Listings</div>
                </div>
                <div className="stat-item">
                  <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>4.8</div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="col-lg-6 col-md-12 login-form-section" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            position: 'relative'
          }}>
            <div className="login-form-container" style={{
              width: '100%',
              maxWidth: '450px',
              padding: '2.5rem',
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              animation: 'fadeInUp 0.6s ease-out',
              position: 'relative',
              zIndex: 2
            }}>
              <div className="login-header">
                <div className="welcome-section mb-4" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                  <h2 className="welcome-title" style={{
                    fontWeight: '700',
                    color: '#333',
                    fontSize: '28px',
                    marginBottom: '0.5rem',
                    lineHeight: '1.2'
                  }}>
                    Welcome to Listify! 👋
                  </h2>
                  <p className="welcome-description" style={{
                    color: '#666',
                    fontSize: '14px',
                    marginTop: '0.5rem'
                  }}>
                    Please sign-in to your account and start the adventure
                  </p>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label" style={{
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    display: 'block',
                    color: '#333',
                    fontSize: '14px'
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="demo@admin.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '0.875rem 1rem',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      background: '#ffffff',
                      color: '#333',
                      width: '100%',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#e74c3c';
                      e.target.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e0e0e0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label" style={{
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    display: 'block',
                    color: '#333',
                    fontSize: '14px'
                  }}>
                    Password
                  </label>
                  <div className="password-input-wrapper" style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      placeholder="●●●●●●"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        padding: '0.875rem 1rem',
                        paddingRight: '3rem',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        background: '#ffffff',
                        color: '#333',
                        width: '100%',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#e74c3c';
                        e.target.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e0e0e0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={togglePassword}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        transition: 'color 0.3s ease',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = '#e74c3c';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = '#666';
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="login-btn"
                  style={{
                    padding: '0.875rem 1.5rem',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    background: '#e74c3c',
                    color: 'white',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#c0392b';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(231, 76, 60, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#e74c3c';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Remove Bootstrap gutters for full coverage */
        .container-fluid.g-0,
        .row.g-0 {
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .row.g-0 > [class*="col-"] {
          padding-right: 0 !important;
          padding-left: 0 !important;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 991px) {
          .login-form-section {
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          
          .login-form-container {
            max-width: 100%;
            padding: 1.5rem;
          }
          
          .login-hero-section {
            display: none;
          }
        }

        @media (max-width: 576px) {
          .login-form-section {
            padding: 0.5rem;
          }
          
          .login-form-container {
            padding: 1rem;
            border-radius: 12px;
          }
          
          .login-header .brand-name {
            font-size: 1.5rem;
          }
          
          .welcome-title {
            font-size: 1.25rem;
          }
          
          .hero-text {
            padding: 0 2rem;
          }
          
          .hero-text h1 {
            font-size: 2rem;
          }
          
          .hero-stats {
            gap: 1.5rem;
          }
        }

        body.dark-theme .login-form-container {
          background: var(--card-bg);
          border: 1px solid var(--border-primary);
        }

        body.dark-theme .social-btn {
          background: var(--bg-tertiary);
          border-color: var(--border-primary);
          color: var(--text-primary);
        }

        body.dark-theme .social-btn:hover {
          background: var(--hover-bg);
          border-color: var(--accent-color);
        }
      `}</style>
    </div>
  );
}

export default Login;

