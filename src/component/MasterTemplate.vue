<template>
  <div class="master-template">
    <header class="header">
      <nav class="nav-container">
        <div class="logo">DataTableList</div>
        <ul class="nav-links">
          <li><router-link to="/data-table-list">DataTableList</router-link></li>
          <li><router-link to="/esempio-cella">Manipola cella </router-link></li>
          <li><router-link to="/esempio-menu">Menu personalizzato</router-link></li>
          <li><router-link to="/es1">es1</router-link></li>
          <li><router-link to="/es2">es2</router-link></li>
          <li><router-link to="/es3">es3</router-link></li>
          <li><router-link to="/es4">es4</router-link></li>
          <li><router-link to="/es5">es5</router-link></li>
          <li><router-link to="/es6">es6</router-link></li>
          <li><router-link to="/es7">es7</router-link></li>
        </ul>
      </nav>
    </header>
    <main class="main-content">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.master-template {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0.75rem 2rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:hover {
  color: #6366f1;
}

.nav-links a.router-link-active {
  color: #6366f1;
}

.nav-links a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #6366f1;
  border-radius: 2px;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  width: 100%;
}
</style>
