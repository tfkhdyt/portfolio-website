import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const errorHandling = (err: AxiosError) => {
  if (axios.isAxiosError(err) && err.response) {
    switch (err.response.status) {
      case 500:
        toast.error('Server error! Try it next time');
        break;
      case 429:
        toast.warning("You're sending message too often! Try it next time");
        break;
      case 400:
        err.response.data.message.forEach((error: string) => {
          toast.error(error.charAt(0).toUpperCase() + error.slice(1));
        });
        break;
      default:
        toast.error('Unknown error');
        break;
    }
  }
};
