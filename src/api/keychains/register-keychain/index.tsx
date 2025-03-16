import api from 'api/axios';
import { getStoredToken } from 'api/context/auth-util';
import { AxiosError } from 'axios';

interface RentalRequestData {
  name: string;
  content: string;
  accessToken: string;
}

interface ErrorResponse {
  message?: string;
}

const postKeychain = async (data: RentalRequestData): Promise<void> => {
  const accessToken = getStoredToken();

  try {
    const response = await api.post(
      'keychains',
      {
        name: data.name,
        content: data.content,
        accessToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.accessToken}`,
        },
      }
    );
    alert(response.data.message);
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = (error.response?.data as ErrorResponse)?.message || '저장에 실패했습니다';
      throw new Error(errorMessage);
    } else if (error instanceof AxiosError && error.request) {
      throw new Error('네트워크 문제 또는 서버가 응답하지 않습니다.');
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};

export default postKeychain;
