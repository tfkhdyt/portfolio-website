export const revalidate = async (path = '/') => {
  try {
    await fetch(`/api/revalidate?path=${path}`);
  } catch (error) {
    throw error;
  }
};
