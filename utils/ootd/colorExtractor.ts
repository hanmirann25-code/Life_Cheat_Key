/**
 * Extract dominant colors from an image using canvas sampling
 */
export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

/**
 * Convert RGB to HSL color space
 */
export function rgbToHsl(r: number, g: number, b: number): HSLColor {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}

/**
 * Extract dominant colors from image file
 */
export async function extractDominantColors(
  file: File,
  sampleSize: number = 100
): Promise<RGBColor[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Scale down image for faster processing
      const maxSize = 200;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Sample colors from grid
      const colors: RGBColor[] = [];
      const step = Math.floor(Math.sqrt((canvas.width * canvas.height) / sampleSize));

      for (let x = 0; x < canvas.width; x += step) {
        for (let y = 0; y < canvas.height; y += step) {
          const pixel = ctx.getImageData(x, y, 1, 1).data;
          colors.push({
            r: pixel[0],
            g: pixel[1],
            b: pixel[2],
          });
        }
      }

      // Simple clustering to find dominant colors
      const dominantColors = clusterColors(colors, 5);
      resolve(dominantColors);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Simple k-means clustering to find dominant colors
 */
function clusterColors(colors: RGBColor[], k: number): RGBColor[] {
  if (colors.length === 0) return [];

  // Initialize centroids randomly
  let centroids: RGBColor[] = [];
  for (let i = 0; i < k; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    centroids.push({ ...colors[randomIndex] });
  }

  // Run k-means for a few iterations
  for (let iter = 0; iter < 5; iter++) {
    const clusters: RGBColor[][] = Array.from({ length: k }, () => []);

    // Assign colors to nearest centroid
    colors.forEach((color) => {
      let minDist = Infinity;
      let closestCluster = 0;

      centroids.forEach((centroid, i) => {
        const dist = colorDistance(color, centroid);
        if (dist < minDist) {
          minDist = dist;
          closestCluster = i;
        }
      });

      clusters[closestCluster].push(color);
    });

    // Update centroids
    centroids = clusters.map((cluster) => {
      if (cluster.length === 0) return centroids[0];

      const sum = cluster.reduce(
        (acc, color) => ({
          r: acc.r + color.r,
          g: acc.g + color.g,
          b: acc.b + color.b,
        }),
        { r: 0, g: 0, b: 0 }
      );

      return {
        r: Math.round(sum.r / cluster.length),
        g: Math.round(sum.g / cluster.length),
        b: Math.round(sum.b / cluster.length),
      };
    });
  }

  return centroids;
}

/**
 * Calculate Euclidean distance between two colors
 */
function colorDistance(c1: RGBColor, c2: RGBColor): number {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
}
