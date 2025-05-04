import PageButtons from '../layout/PageButtons';
import { Footer } from './Footer';
import { recipes as allRecipes } from './recipes'; // assuming you exported the full object from a local file
import { useState } from 'react';

interface Recipe {
  name: string;
  ingredients: string[];
  price_estimation: number;
  image_url?: string;
  nutrition?: string;
  instructions?: string;
  youtube?: string;
}

export default function RecipeFinder() {
  const [diet, setDiet] = useState<string>('Animal-Based');
  const [ingredients, setIngredients] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>('');

  const findRecipeMatch = (diet: string, ingredientsAvail: string[]): Recipe[] => {
    const match: Recipe[] = [];
    const dietRecipes = allRecipes[diet] || [];
    for (const recipe of dietRecipes) {
      if (recipe.ingredients.some((item) => ingredientsAvail.includes(item))) {
        match.push(recipe);
      }
    }
    return match;
  };

  const handleSubmit = () => {
    try {
      const ingredientsList = ingredients
        .split(',')
        .map((i) => i.trim().toLowerCase())
        .filter(Boolean);

      if (!diet || ingredientsList.length === 0) {
        setError('Missing diet or ingredients!');
        return;
      }

      const matched = findRecipeMatch(diet, ingredientsList);
      setRecipes(matched);
      setError('');
    } catch (err) {
      setError('Something went wrong in the matching logic.');
    }
  };

  return (
    <>
    <PageButtons/>
    <div className="p-8 max-w-xl mx-auto text-white">
      
      <h2 className="text-2xl font-bold mb-4 text-red-500">Diet-Based Recipe Finder</h2>

      <label className="block mb-2 text-red-500">Choose your diet:</label>
      <select
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
        className="w-full p-2 mb-4 border rounded text-white bg-gray-800"
      >
        <option>Animal-Based</option>
        <option>Keto</option>
        <option>Vegetarian</option>
        <option>Student-Budget</option>
        <option>General Healthy Foods</option>
      </select>

      <label className="block mb-2 text-red-500">Enter your ingredients (comma separated):</label>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full p-2 mb-4 border rounded text-white bg-gray-800"
        placeholder="e.g. rice, egg, soy sauce"
      />

      <button
        onClick={handleSubmit}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Get Recipes
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {recipes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-red-500">Matching Recipes:</h3>
          <ul className="space-y-6">
            {recipes.map((recipe, idx) => (
              <li key={idx} className="bg-black border border-red-500 p-4 rounded text-red-500">
                <p className="font-bold text-xl mb-2">{recipe.name}</p>

                <div className="flex justify-between items-start mb-4 gap-4">
                  {recipe.image_url && (
                    <img
                      src={recipe.image_url}
                      alt={recipe.name}
                      className="rounded w-48 h-36 object-cover"
                    />
                  )}
                  <img
                    src="/logo.png"
                    alt="Pinpoint logo"
                    className="w-48 h-36 object-contain"
                  />
                </div>

                <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                <p>Estimated Price: ${recipe.price_estimation.toFixed(2)} using <span className="text-white font-semibold">DAPR</span></p>
                {recipe.nutrition && <p>Nutrition: {recipe.nutrition}</p>}

                {recipe.instructions && (
                  <p className="italic text-red-300">
                    {recipe.instructions.includes('For full instructions') ? (
                      <>
                        <span>
                          {recipe.instructions.split('For full instructions')[0]}
                        </span>
                        <u>For full instructions, watch the video below.</u>
                      </>
                    ) : (
                      recipe.instructions
                    )}
                  </p>
                )}

                {recipe.youtube && (
                  <a
                    href={recipe.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline mt-2 inline-block"
                  >
                    Watch on YouTube
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
    </>
  );
}
