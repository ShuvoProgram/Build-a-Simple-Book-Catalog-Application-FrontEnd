interface ImageUploadResponse {
    data: {
        display_url: string;
    }
}

export const getImageUrl = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', image);

  const url = `https://api.imgbb.com/1/upload?key=5f27d941b548ee80fd54f8c811e0d352`;

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data: ImageUploadResponse = await response.json();
  return data.data.display_url;
};