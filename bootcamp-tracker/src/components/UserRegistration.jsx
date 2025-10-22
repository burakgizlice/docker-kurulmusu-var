import React, { useState } from 'react';
import './UserRegistration.css';

const UserRegistration = ({ onUserRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'İsim gerekli';
    }
    
    if (!formData.surname.trim()) {
      newErrors.surname = 'Soyisim gerekli';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta gerekli';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Register the user
    onUserRegister(formData);
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1>🐳 Docker: Kurulmuşu Var!</h1>
          <h2>Bootcamp'e Hoş Geldiniz</h2>
          <p>Devam etmek için lütfen bilgilerinizi giriniz</p>
        </div>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">İsim *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="İsminizi giriniz"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="surname">Soyisim *</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className={errors.surname ? 'error' : ''}
              placeholder="Soyisminizi giriniz"
            />
            {errors.surname && <span className="error-message">{errors.surname}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">E-posta *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="ornek@email.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <button type="submit" className="register-btn">
            🚀 Bootcamp'e Başla
          </button>
        </form>

        <div className="registration-footer">
          <p>* Bu bilgiler sadece etkinlik sonrası iletişim için kullanılacaktır.</p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;