<template>
  <div class="layout-container">
    <!-- Header -->
    <header class="header bg-gray-800 text-white p-4">
      <h1>My App</h1>
      <nav>
        <NuxtLink to="/"></NuxtLink> | 
        <NuxtLink to="/about">About</NuxtLink>
      </nav>
    </header>

    <div class="content-container">
      <!-- Sidebar -->
      <aside class="sidebar bg-gray-100 p-4">
        <h2>Sidebar</h2>
        <ul>
          <li><NuxtLink to="/">Dashboard</NuxtLink></li>
          <li><NuxtLink to="/about">About Us</NuxtLink></li>
          <li><NuxtLink to="/settings">Settings</NuxtLink></li>
        </ul>
      </aside>

      <!-- Nội dung chính -->
      <main class="main-content p-4">
        <slot />
      </main>
    </div>

    <!-- Footer -->
    <footer class="footer bg-gray-800 text-white p-4">
      <p>© 2024 My App</p>
    </footer>
  </div>
</template>

<style scoped>
/* Container tổng */
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
.header {
  flex-shrink: 0;
}

/* Content container: chia 2 cột */
.content-container {
  display: flex;
  flex: 1;
}

/* Sidebar */
.sidebar {
  width: 250px;
  flex-shrink: 0;
  background-color: #f8f9fa;
}

/* Nội dung chính */
.main-content {
  flex: 1;
  background-color: #ffffff;
}

/* Footer */
.footer {
  flex-shrink: 0;
}
</style>
