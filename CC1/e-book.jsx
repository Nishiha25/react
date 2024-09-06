import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './e-book.css';

function App1() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [cart, setCart] = useState([]); 
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const addToWishlist = (book) => {
    setWishlist([...wishlist, book]);
  };

  const modifyCart = (book, action) => {
    if (action === 'remove') {
      setCart(cart.filter(item => item.id !== book.id));
    }
  };

  return (
    <Router>
      <div>
        {!isLoggedIn ? (
          <Routes>
            <Route path="*" element={<Auth isLogin={true} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/login" element={<Auth isLogin={true} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Auth isLogin={false} setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        ) : (
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/logout" onClick={() => setIsLoggedIn(false)}>Logout</Link>
                </li>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/cart">My Cart ({cart.length})</Link>
                </li>
                <li>
                  <Link to="/wishlist">My Wishlist ({wishlist.length})</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={<Homepage addToCart={addToCart} addToWishlist={addToWishlist} />} />
              <Route path="/cart" element={<CartPage cart={cart} modifyCart={modifyCart} />} />
              <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

function Auth({ isLogin, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      setIsLoggedIn(true);
      navigate('/');
    } else {
      if (password === confirmPassword) {
        setIsLoggedIn(true);
        navigate('/');
      } else {
        alert('Passwords do not match');
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'LOGIN' : 'SIGN UP'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {!isLogin && (
          <div>
            <label>Confirm Password:</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
        {isLogin ? 
          "Don't have an account? " : 
          'Already have an account? '}
        <Link to={isLogin ? '/signup' : '/login'}>
          {isLogin ? 'Sign Up' : 'Login'}
        </Link>
      </p>
    </div>
  );
}

function Homepage({ addToCart, addToWishlist }) {
  const featuredBooks = [
    {
      id: 1,
      title: 'The CLUE',
      author: 'John Doe',
      price: 999,
      img: 'https://i.pinimg.com/736x/a7/64/ec/a764ec667657055823df7c9c8c79234d.jpg',
    },
    {
      id: 2,
      title: 'The Astonishing (Adventure of Jane Smith)',
      author: 'Jane Smith',
      price: 1299,
      img: 'https://m.media-amazon.com/images/I/71OI-1dyjsL._AC_UF1000,1000_QL80_.jpg',
    },
    {
      id: 3,
      title: 'The People In The Woods',
      author: 'Robert Brown',
      price: 769,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr61HnJKA5QM21PG4iypk7hRqGFVmVxbZA5Q&s',
    },
  ];

  const latestReleases = [
    {
      id: 4,
      title: 'LONELY',
      author: 'Emily White',
      price: 1129,
      img: 'https://m.media-amazon.com/images/I/31Qgp9BkP4L.jpg',
    },
    {
      id: 5,
      title: 'On the BEACH (The Vintage Visitor)',
      author: 'Chris Green',
      price: 729,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4v_9ip7UKGREFraMi9l0S2wnQNiIOgfzCMw&s',
    },
    {
      id: 6,
      title: 'BLACK BEAUTY',
      author: 'Anna Black',
      price: 1579,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKwKXxGIQO3OoLpH-VBukG_HjJoOPFXNt4dA&s',
    },
  ];

  return (
    <div>
      <h2>Welcome to the E-Bookstore</h2>
      <p>Explore a wide range of e-books and enjoy reading!</p>

      <section>
        <h3>Featured Books</h3>
        <div className="book-list">
          {featuredBooks.map(book => (
            <div key={book.id} className="book">
              <img src={book.img} alt={book.title} />
              <h4>{book.title}</h4>
              <p>Author: {book.author}</p>
              <p className="price">₹{book.price}/-</p>
              <button className="buy-btn" onClick={() => addToCart(book)}>Buy Now</button>
              <br/><br/>
              <button className="buy-btn" onClick={() => addToWishlist(book)}>Add to Wishlist</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Latest Releases</h3>
        <div className="book-list">
          {latestReleases.map(book => (
            <div key={book.id} className="book">
              <img src={book.img} alt={book.title} />
              <h4>{book.title}</h4>
              <p>Author: {book.author}</p>
              <p className="price">₹{book.price}/-</p>
              <button className="buy-btn" onClick={() => addToCart(book)}>Buy Now</button>
              <br/><br/>
              <button className="buy-btn" onClick={() => addToWishlist(book)}>Add to Wishlist</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CartPage({ cart, modifyCart }) {
  const [deliveryOption, setDeliveryOption] = useState('standard');

  const handleRemove = (book) => {
    modifyCart(book, 'remove');
  };

  return (
    <div>
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <img src={item.img} alt={item.title} width="50" /> {item.title} - ₹{item.price}
                <button onClick={() => handleRemove(item)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <h3>Choose Delivery Option:</h3>
            <label>
              <input 
                type="radio" 
                value="standard" 
                checked={deliveryOption === 'standard'} 
                onChange={() => setDeliveryOption('standard')} 
              />
              Standard Delivery (Free)
            </label>
            <br />
            <label>
              <input 
                type="radio" 
                value="express" 
                checked={deliveryOption === 'express'} 
                onChange={() => setDeliveryOption('express')} 
              />
              Express Delivery (₹100)
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

function WishlistPage({ wishlist }) {
  return (
    <div>
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <ul>
          {wishlist.map((item, index) => (
            <li key={index}>
              <img src={item.img} alt={item.title} width="50" /> {item.title} - ₹{item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App1;
