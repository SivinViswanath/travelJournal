import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

export const getTouristSuggestions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { location, latitude, longitude } = req.body;

    let searchLocation = location;

    // If coordinates provided, reverse geocode first
    if (!searchLocation && latitude && longitude) {
      try {
        const geoRes = await axios.get(
          `https://nominatim.openstreetmap.org/reverse`,
          {
            params: {
              format: 'json',
              lat: latitude,
              lon: longitude,
            },
            headers: {
              'User-Agent': 'TravelJournalApp/1.0 (sivinviswanath99@gmail.com)', // Replace with actual app info
            },
          },
        );

        const address = geoRes.data.address;
        searchLocation =
          address.city ||
          address.town ||
          address.village ||
          address.suburb ||
          'Unknown Location';
        console.log(`Resolved coordinates to: ${searchLocation}`);
      } catch (geoError) {
        console.error('Reverse geocoding failed:', geoError);
        // Fallback or error out? Let's try to proceed if we can, or error.
        // For now, if we can't get a location, we can't suggest.
        res.status(400).json({
          message: 'Could not determine location name from coordinates',
        });
        return;
      }
    }

    if (!searchLocation) {
      res.status(400).json({ message: 'Location or Coordinates are required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ message: 'Gemini API key not configured' });
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `I am a tourist in ${searchLocation}. Please suggest 5-8 top tourist places near me. 
    Return the response ONLY in valid JSON format. 
    The JSON should be an array of objects, where each object has these fields:
    - name: string (Name of the place)
    - description: string (Short enticing description, max 2 sentences)
    - rating: number (Approximate rating out of 5, e.g., 4.5)
    - type: string (e.g., "Historical", "Nature", "Adventure", "Food")
    
    Do not include any markdown formatting like \`\`\`json. Just the raw JSON string.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonString = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    try {
      const suggestions = JSON.parse(jsonString);
      res.status(200).json({
        location: searchLocation,
        suggestions,
      });
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      res
        .status(500)
        .json({ message: 'Failed to parse AI suggestions', raw: text });
    }
  } catch (error) {
    console.error('Error fetching AI suggestions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
