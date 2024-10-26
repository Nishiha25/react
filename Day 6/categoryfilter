import React from 'react';
function Albumslist()
{
    const album = [
        { name: 'Thriller', singer: 'Michael Jackson' },
        { name: 'Like a Virgin', singer: 'Madonna' },
        { name: 'A Night at the Opera', singer: 'Queen' },
        { name: 'Blue Hawaii', singer: 'Elvis Presley' },
      ];
    
return(
    <div>
<h2>Albums</h2>
<ul>
    {album.map((a,index)=>(
        <li key={index}>
            {a.name} - by {a.singer}
        </li>// src/components/CategoryFilter.js
import React, { useContext } from 'react';
import { ProductContext } from './ProductContext';

const CategoryFilter = () => {
  const { categories, setSelectedCategory } = useContext(ProductContext);

  return (
    <div>
      <h3>Filter by Category</h3>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
    ))}
</ul>
    </div>
)
}
export default Albumslist;
