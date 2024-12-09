import React from 'react';
import './ContactForm.css';

const ContactForm = () => {
  return (
    <section id="contact">
      <div className="contact-form">
        <h2>Contact Me</h2>
        <form>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <input type="email" className="form-control" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <textarea className="form-control" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;