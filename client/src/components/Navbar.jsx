
import React from 'react';

function Navbar() {
  const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
    
  };
  return (
    <div>
      
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">BOOK MY ROOM</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarNav">
    <ul class="navbar-nav ml-auto">

{localStorage.getItem('currentUser') ? (
  <>
  <li class="nav-item active">
    <a class="nav-link" href="/profile">
    <i class="fa-solid fa-user"></i> {JSON.parse(localStorage.getItem('currentUser')).name}
    </a>
  </li>
  <li class="nav-item active">
    <a class="nav-link" href="#" onClick={logout}>
      Logout
    </a>
  </li>
</>

) : (
  <>
  <li class="nav-item active">
    <a class="nav-link" href="/register">
      Register
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/login">
      Login
    </a>
  </li>
  </>
  )}
 
</ul>
    </div>
  </div>
</nav>
    </div>
  );
}

export default Navbar;