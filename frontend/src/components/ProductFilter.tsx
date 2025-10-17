import { useState } from 'react';
import { useCategoryContext } from '../context/CategoryContext';

interface FilterProps {
  onFilter: (filters: {
    name: string;
    category: string[];
    availability: string;
  }) => void;
}

function ProductFilter({ onFilter }: FilterProps) {
  const { categories } = useCategoryContext();

  const [name, setName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [availability, setAvailability] = useState('all');

  const handleSearch = () => {
    onFilter({ name, category: selectedCategories, availability });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <section className="bg-white p-6 shadow-md rounded-xl mb-3">
      {/* Fila principal */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label htmlFor='name' className="font-semibold text-gray-700">Name</label>
          <input
            id='name'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search by name..."
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label htmlFor='category' className="font-semibold text-gray-700">Category</label>
          <div className="flex flex-wrap gap-2 border border-gray-300 p-2 rounded-lg">
            {categories.map((cat) => (
              <button
                id='category'
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategories.includes(cat)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Availability y Search */}
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label htmlFor='availability' className="font-semibold text-gray-700">Availability</label>
          <select
            id='availability'
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="all">All</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>

          {/* 👇 Search Button */}
          <button 
            onClick={handleSearch}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      
    </section>
  );
}

export default ProductFilter;
