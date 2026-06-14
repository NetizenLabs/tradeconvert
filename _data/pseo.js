const PSEO_VARIABLES = {
  plot_sizes: [
    '3-marla', '5-marla', '7-marla', '10-marla', '12-marla', '1-kanal', '2-kanal',
    '500-sqft', '1000-sqft', '1500-sqft', '2000-sqft', '3000-sqft', '5000-sqft',
    '50-sqm', '100-sqm', '150-sqm', '200-sqm', '300-sqm', '500-sqm'
  ],
  stories: ['single-story', 'double-story', 'triple-story'],
  materials: [
    'bricks', 'cement', 'sand', 'crush-aggregate', 
    'steel-reinforcement', 'plastering-mortar', 
    'floor-tiles', 'wall-paint', 'grey-structure', 'finishing-turnkey'
  ],
  plot_sizes_categorized: {
    "Local (Marla & Kanal)": ['3-marla', '5-marla', '7-marla', '10-marla', '12-marla', '1-kanal', '2-kanal'],
    "Global (Square Feet)": ['500-sqft', '1000-sqft', '1500-sqft', '2000-sqft', '3000-sqft', '5000-sqft'],
    "Metric (Square Meters)": ['50-sqm', '100-sqm', '150-sqm', '200-sqm', '300-sqm', '500-sqm']
  }
};

const PLOT_COVERED_AREAS_SQFT = {
  '3-marla': { single: 650, double: 1215, triple: 1800 },
  '5-marla': { single: 900, double: 2025, triple: 2900 },
  '7-marla': { single: 1250, double: 2650, triple: 3800 },
  '10-marla': { single: 1650, double: 3375, triple: 4800 },
  '12-marla': { single: 2000, double: 4100, triple: 5800 },
  '1-kanal':  { single: 3200, double: 6300, triple: 9000 },
  '2-kanal':  { single: 6000, double: 12000, triple: 17000 },
  '500-sqft': { single: 400, double: 800, triple: 1200 },
  '1000-sqft': { single: 800, double: 1600, triple: 2400 },
  '1500-sqft': { single: 1200, double: 2400, triple: 3600 },
  '2000-sqft': { single: 1600, double: 3200, triple: 4800 },
  '3000-sqft': { single: 2400, double: 4800, triple: 7200 },
  '5000-sqft': { single: 4000, double: 8000, triple: 12000 },
  '50-sqm': { single: 430, double: 860, triple: 1290 },
  '100-sqm': { single: 860, double: 1720, triple: 2580 },
  '150-sqm': { single: 1290, double: 2580, triple: 3870 },
  '200-sqm': { single: 1720, double: 3440, triple: 5160 },
  '300-sqm': { single: 2580, double: 5160, triple: 7740 },
  '500-sqm': { single: 4300, double: 8600, triple: 12900 }
};

const MATERIAL_THUMB_RULES = {
  'bricks': { rate: 8, unit: 'bricks', label: 'Bricks (Standard 9" wall)' },
  'cement': { rate: 0.4, unit: 'bags', label: 'Cement Bags (Grey structure)' },
  'sand': { rate: 0.816, unit: 'cft', label: 'Sand (Volumetric usage)' },
  'crush-aggregate': { rate: 0.608, unit: 'cft', label: 'Crush/Stone Aggregate' },
  'steel-reinforcement': { rate: 4.5, unit: 'kg', label: 'Steel/Rebar (Grade-60)' },
  'plastering-mortar': { rate: 0.15, unit: 'bags', label: 'Cement for Plastering' },
  'floor-tiles': { rate: 1.05, unit: 'sqft', label: 'Tiles (Including 5% wastage)' },
  'wall-paint': { rate: 0.05, unit: 'gallons', label: 'Paint (Gallons per sqft)' },
  'grey-structure': { rate: 1500, unit: 'PKR', label: 'Cost Est. (PKR)' },
  'finishing-turnkey': { rate: 3000, unit: 'PKR', label: 'Cost Est. (PKR)' },
};

module.exports = function() {
  const pages = [];
  
  for (const plot of PSEO_VARIABLES.plot_sizes) {
    for (const story of PSEO_VARIABLES.stories) {
      for (const mat of PSEO_VARIABLES.materials) {
        const slug = `${plot}-${story}-${mat}-calculator`;
        
        const storyKey = story.split('-')[0];
        const areaSqFt = PLOT_COVERED_AREAS_SQFT[plot]?.[storyKey] || 0;
        
        const materialData = MATERIAL_THUMB_RULES[mat];
        const amount = Math.ceil(areaSqFt * materialData.rate);
        
        const relatedSizes = PSEO_VARIABLES.plot_sizes
          .filter(p => p !== plot)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(p => ({
            name: `${p.replace('-', ' ').toUpperCase()} ${mat.replace('-', ' ').toUpperCase()}`,
            url: `/estimation/${p}-${story}-${mat}-calculator/`
          }));

        pages.push({
          slug,
          plotSize: plot,
          story: story,
          material: mat,
          formattedPlot: plot.replace('-', ' ').toUpperCase(),
          formattedStory: story.replace('-', ' ').toUpperCase(),
          formattedMat: mat.replace('-', ' ').toUpperCase(),
          amount: amount,
          amountFormatted: amount.toLocaleString(),
          unit: materialData.unit,
          label: materialData.label,
          areaSqFt: areaSqFt,
          areaSqFtFormatted: areaSqFt.toLocaleString(),
          relatedLinks: relatedSizes,
          plotSizesCategorized: PSEO_VARIABLES.plot_sizes_categorized,
          allStories: PSEO_VARIABLES.stories,
          allMaterials: PSEO_VARIABLES.materials
        });
      }
    }
  }
  
  return pages;
};
