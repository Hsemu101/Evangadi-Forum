import React from 'react'
import { useRef } from 'react'






function Regester() {

  const userName = useRef(null)

async function handleSubmit(e){
  e.preventDefault();
 (userName.current)
}

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <div class="form-group">
            <label for="username">Username:</label>
            <input ref={userName} type="text" id="username" placeholder="username" />
        </div>
        <div class="form-group">
            <label for="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" />
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" />
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password"/>
        </div>
        <button type="submit">Register</button>
    </form>

    </div>
  )
}

export default Regester