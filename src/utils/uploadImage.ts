import axios from 'axios';

export const uploadImage = async (file: File): Promise<string | null> => {
  if (!file) return null;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data?.imageUrl || null;
  } catch (error) {
    console.error('Image upload failed:', error);
    return null;
  }
};
