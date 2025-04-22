import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('coffee');

  const menuItems = {
    coffee: [
      { id: 1, name: 'Espresso', description: 'Strong and concentrated coffee', price: 3.50 },
      { id: 2, name: 'Americano', description: 'Espresso diluted with hot water', price: 3.75 },
      { id: 3, name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 4.50 },
      { id: 4, name: 'Latte', description: 'Espresso with steamed milk', price: 4.50 },
      { id: 5, name: 'Mocha', description: 'Espresso with chocolate and steamed milk', price: 5.00 },
      { id: 6, name: 'Cold Brew', description: '24-hour steeped cold coffee', price: 4.75 },
      { id: 7, name: 'Iced Coffee', description: 'Chilled coffee served over ice', price: 4.25 },
      { id: 8, name: 'Macchiato', description: 'Espresso with a dash of milk', price: 4.00 },
    ],
    tea: [
      { id: 9, name: 'Green Tea', description: 'Classic Japanese green tea', price: 3.50 },
      { id: 10, name: 'Earl Grey', description: 'Black tea with bergamot flavor', price: 3.50 },
      { id: 11, name: 'Chai Latte', description: 'Spiced tea with steamed milk', price: 4.75 },
      { id: 12, name: 'Herbal Tea', description: 'Caffeine-free herbal infusion', price: 3.75 },
    ],
    pastries: [
      { id: 13, name: 'Croissant', description: 'Buttery, flaky pastry', price: 3.25 },
      { id: 14, name: 'Chocolate Muffin', description: 'Rich chocolate muffin', price: 3.50 },
      { id: 15, name: 'Blueberry Scone', description: 'Scone with fresh blueberries', price: 3.75 },
      { id: 16, name: 'Cinnamon Roll', description: 'Sweet roll with cinnamon and frosting', price: 4.25 },
    ],
    sandwiches: [
      { id: 17, name: 'Avocado Toast', description: 'Sourdough bread with avocado spread', price: 7.50 },
      { id: 18, name: 'Caprese Sandwich', description: 'Tomato, mozzarella, and basil on ciabatta', price: 8.25 },
      { id: 19, name: 'Turkey & Cheese', description: 'Turkey with cheddar on whole grain bread', price: 8.50 },
      { id: 20, name: 'Veggie Wrap', description: 'Seasonal vegetables in a spinach wrap', price: 7.75 },
    ],
  };

  return (
    <div className="menu-page">
      <div className="container">
        <h1 className="page-title">Our Menu</h1>
        
        <div className="menu-categories">
          <button 
            className={`category-btn ${activeCategory === 'coffee' ? 'active' : ''}`}
            onClick={() => setActiveCategory('coffee')}
          >
            Coffee
          </button>
          <button 
            className={`category-btn ${activeCategory === 'tea' ? 'active' : ''}`}
            onClick={() => setActiveCategory('tea')}
          >
            Tea
          </button>
          <button 
            className={`category-btn ${activeCategory === 'pastries' ? 'active' : ''}`}
            onClick={() => setActiveCategory('pastries')}
          >
            Pastries
          </button>
          <button 
            className={`category-btn ${activeCategory === 'sandwiches' ? 'active' : ''}`}
            onClick={() => setActiveCategory('sandwiches')}
          >
            Sandwiches
          </button>
        </div>
        
        <div className="menu-items">
          {menuItems[activeCategory].map(item => (
            <div className="menu-item" key={item.id}>
              <div className="menu-item-content">
                <div className="menu-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="menu-item-price">${item.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;