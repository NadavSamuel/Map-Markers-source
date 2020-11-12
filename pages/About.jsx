import React, { useEffect } from 'react'

export function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <section className="about-container flex column align-center">
      <div className="profile-img-container flex justify-center">
        <img src={require('../assets/imgs/profile.jpg')} alt="" />
      </div>
      <div className="personal-txt-container">
        <h1>Hi! my name is Nadav Samuel and i'm a <span>Full-Stack</span> developer!</h1>
        <p> I'm 22 years old, born in Givaataim, Israel. 
        Motivational fullstack web developer. People person and a team player.
        <br/>
        <br/>
        <span>samuelna9@gmail.com </span>

</p>
      </div>


    </section>
  )
}

