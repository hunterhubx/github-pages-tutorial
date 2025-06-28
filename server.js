const express = require('express');
const path = require('path');
const app = express();
const blogData = require('./blogData');

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Home Page: List blog posts
app.get('/', (req, res) => {
  try {
    res.render('index', { 
      posts: blogData,
      title: 'SHOPY KINGDOMS VIRTUAL SHOP - Blog'
    });
  } catch (error) {
    res.status(500).render('500', { error });
  }
});

// Single Blog Post Page
app.get('/blog/:id', (req, res) => {
  try {
    const post = blogData.find(p => p.id === req.params.id);
    if (!post) {
      return res.status(404).render('404', { 
        message: "Blog post not found",
        title: '404 - Not Found'
      });
    }
    res.render('blog', { 
      post,
      posts: blogData,
      title: `${post.title} - SHOPY KINGDOMS VIRTUAL SHOP`
    });
  } catch (error) {
    res.status(500).render('500', { error });
  }
});

// Error Handling (404 for non-matching routes)
app.use((req, res) => {
  res.status(404).render('404', { 
    message: "Page not found",
    title: '404 - Not Found'
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the blog`);
});
