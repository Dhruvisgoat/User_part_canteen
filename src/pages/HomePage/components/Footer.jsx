import React from 'react'

const landingPageStyles = {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
};


function Footer() {
    return (
        <div style={landingPageStyles} >
            <section id="contact" style={{ backgroundColor: '#257090', color: 'white', paddingTop: '50px' }}>
                <h1 style={{ marginBottom: '30px' }}><b>Contact Us</b></h1>
                <div style={{marginBottom:'70px'}}>
                    <p>If you have any questions or inquiries, feel free to reach out to us:</p>
                    <p><u>Email</u>: dycalculus@gmail.com</p>
                    <p><u>Phone</u>: +91 8383928306</p>
                </div>

                <iframe
                    title="Canteen Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.633529820818!2d-122.08464388418307!3d37.42199997982112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7eef24e0fc65%3A0xf44a890ad04846ef!2sGoogleplex!5e0!3m2!1sen!2sus!4v1656713370793!5m2!1sen!2sus"
                    width="100%"
                    height="500"
                    allowFullScreen=""
                    loading="lazy"
                />
            </section>
            <footer >
                <p>&copy; 2023 CanteenApp. All rights reserved.</p>
            </footer></div>
    )
}

export default Footer